import { JSDOM } from "jsdom"
import { iMagaluResponse, iRastreio } from "./interfaces"
import axios, { isAxiosError } from "axios"
import PacoteInvalidoException from "../exceptions/PacoteInvalidoException"
import logger from "../logger"
import ServicoIndisponivelException from "../exceptions/ServicoIndisponivelException"

export default class Magalu {
    private readonly baseURL: string

    constructor() {
        this.baseURL = "https://rastreamento.magazineluiza.com.br/"
    }

    fetch = async (code: string): Promise<iRastreio> => {
        const payload = {
            id: code
        }

        const response = await axios.get(this.baseURL, { params: payload })
        const { data } = response

        return this.extract(this.parse(data), code)
    }

    // returns pageProps inside HTML
    parse = (html: string) => {
        const parser = new JSDOM(html)  
        const props = parser.window.document.querySelector('#__NEXT_DATA__');

        if (!props || props.textContent == null) { throw new ServicoIndisponivelException("Não foi possível encontrar os dados da página.") }

        const json = JSON.parse(props.innerHTML)
        const { props: { pageProps } } = json

        return pageProps as iMagaluResponse
    }

    extract = (response: iMagaluResponse, code: string): iRastreio => {
        const { data } = response

        if(!data.length){
            throw new PacoteInvalidoException("Ainda não há atualização no pacote ou o código é inválido.")
        }

        const events = data.map(event => {
            return {
                data: event.date,
                hora: event.hour,
                local: event.locale,
                status: event.description,
                subStatus: [
                    `${event.city} - ${event.state}`,
                    event.destinations[0] ? `${event.destinations[0].city} - ${event.destinations[0].state}` : "Não há."
                ]
            }

        })

        return {
            codigo: code,
            time: new Date(`${response.data[0].date} ${response.data[0].hour}`).getTime(),
            eventos: events.reverse()
        }
    }

    track = async (code: string): Promise<string | iRastreio> => {
        try {
            const response = await this.fetch(code)

            return response
        } catch (err) {
            if(err instanceof PacoteInvalidoException)
                return err.message

            if(err instanceof ServicoIndisponivelException)
                return err.message
            
            logger.error(err)
            return "Ocorreu um erro inesperado."
        }
    }
}