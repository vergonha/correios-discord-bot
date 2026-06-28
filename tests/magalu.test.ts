import { test, expect, mock, beforeEach, jest } from "bun:test";
import Magalu from "../src/services/Magalu/Magalu";
import axios from "axios";
import ServicoIndisponivelException from "../src/exceptions/ServicoIndisponivelException";
import PacoteInvalidoException from "../src/exceptions/PacoteInvalidoException";
import { iMagaluResponse } from "../src/services/Magalu/interfaces/iMagaluResponse";

mock.module("axios", () => ({
  default: {
    get: mock(() => Promise.resolve({ data: "" })),
  },
}));

let magalu: Magalu;
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  magalu = new Magalu();
  mockedAxios.get.mockClear();
});

test("parse deve extrair pageProps do HTML", () => {
  const html = `
    <html><body>
      <script id="__NEXT_DATA__">{"props":{"pageProps":{"data":[{"date":"10/10/2023","hour":"10:00","locale":"SP","description":"Entregue","city":"São Paulo","state":"SP","destinations":[]}]}}}</script>
    </body></html>
  `;

  const result = magalu.parse(html);
  expect(result.data).toHaveLength(1);
});

test("parse deve lançar ServicoIndisponivelException se não encontrar __NEXT_DATA__", () => {
  const html = "<html><body></body></html>";
  expect(() => magalu.parse(html)).toThrow(ServicoIndisponivelException);
});

test("extract deve mapear eventos corretamente", () => {
  const mockResponse: iMagaluResponse = {
    data: [
      {
        date: "10/10/2023",
        hour: "10:00",
        locale: "SP",
        description: "Entregue",
        city: "São Paulo",
        state: "SP",
        destinations: [],
        type: "",
        status: "",
        detail: "",
        document: "",
        recipient: "",
        address: "",
        comment: "",
        code: ""
      },
    ],
  };

  const result = magalu.extract(mockResponse, "AB123");
  expect(result.codigo).toBe("AB123");
  expect(result.eventos).toHaveLength(1);
  expect(result.eventos[0].status).toBe("Entregue");
});

test("extract deve lançar PacoteInvalidoException se data estiver vazia", () => {
  expect(() => magalu.extract({ data: [] }, "AB123")).toThrow(
    PacoteInvalidoException
  );
});

test("fetch deve fazer request e retornar dados processados", async () => {
  const html = `
    <html><body>
      <script id="__NEXT_DATA__">{"props":{"pageProps":{"data":[{"date":"10/10/2023","hour":"10:00","locale":"SP","description":"Entregue","city":"São Paulo","state":"SP","destinations":[]}]}}}</script>
    </body></html>
  `;

  mockedAxios.get.mockResolvedValueOnce({ data: html });

  const result = await magalu.fetch("AB123");
  expect(result.codigo).toBe("AB123");
  expect(mockedAxios.get).toHaveBeenCalledTimes(1);
});

test("track deve retornar dados com sucesso", async () => {
  const mockData = { codigo: "AB123", time: 123, eventos: [] };
  const fetchSpy = mock(() => Promise.resolve(mockData));
  magalu.fetch = fetchSpy;

  const result = await magalu.track("AB123");
  expect(result.codigo).toBe("AB123");
  expect(fetchSpy).toHaveBeenCalledWith("AB123");
});