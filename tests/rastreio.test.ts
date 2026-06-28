import "reflect-metadata";
import { test, expect, mock, beforeEach } from "bun:test";
import RastreioProvider from "../src/services/Provider";
import iProvider from "../src/services/iProvider";
import PacoteInvalidoException from "../src/exceptions/PacoteInvalidoException";

class MockProvider implements iProvider {
  track = mock<(code: string) => Promise<any>>();

  constructor(shouldFail: boolean) {
    if (shouldFail) {
      this.track.mockRejectedValue(new PacoteInvalidoException("Falha simulada"));
    } else {
      this.track.mockResolvedValue({ codigo: "AB123", time: 123, eventos: [] });
    }
  }
}

let provider: RastreioProvider;

beforeEach(() => {
  provider = new RastreioProvider();
});

test("deve rastrear com sucesso usando o primeiro provider", async () => {
  provider.register(new MockProvider(false));

  const result = await provider.track("AB123");
  expect(result.codigo).toBe("AB123");
});

test("deve tentar o próximo provider se o primeiro falhar", async () => {
  provider.register(new MockProvider(true));
  provider.register(new MockProvider(false));

  const result = await provider.track("AB123");
  expect(result.codigo).toBe("AB123");
});

test("deve lançar o último erro se todos os providers falharem", async () => {
  provider.register(new MockProvider(true));
  provider.register(new MockProvider(true));

  expect(() => provider.track("AB123")).toThrow(PacoteInvalidoException);
});