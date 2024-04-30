import { iRastreio } from "../../utils/interfaces.js"
import ServicoIndisponivelException from "../../exceptions/ServicoIndisponivelException.js"
import PacoteInvalidoException from "../../exceptions/PacoteInvalidoException.js"
import iProvider from "../iProvider.js"
import { iShopeeResponse } from "./interfaces/iShopeeResponse.js"
import moment from "moment"
import logger from "../../logger.js"

export default class Shopee implements iProvider {
    private readonly baseURL;
    private readonly cookie;

    constructor(cookie: string) {
        this.baseURL = "https://shopee.com.br/api/v4/order/get_order_detail"
        this.cookie = cookie;
    }

    track = async (code: string): Promise<iRastreio> => {
        const { data, error, error_msg } = await this.fetch(code);

        if (error != 0){
            logger.error(`Shopee: ${error_msg}`)
            throw new PacoteInvalidoException("Ainda não há atualização no pacote ou o código é inválido.")
        }

        const updateDate = moment(data.shipping.tracking_info.ctime * 1000)
        
        return {
            codigo: data.shipping.tracking_number,
            time: data.shipping.tracking_info.ctime,
            eventos: [
                {
                    data: updateDate.format("DD/MM/YYYY"),
                    hora: updateDate.format("HH:mm"),
                    local: "Indisponível em rastreio tipo SHOPEE",
                    status: data.shipping.tracking_info.description,
                    subStatus: ["Indisponível", "Indisponível"],
                }
            ]
        }
    }

    fetch = async (code: string): Promise<iShopeeResponse> => {
        const params = new URLSearchParams({ "order_id": code }).toString()
        const response = await fetch(`${this.baseURL}?${params}`, {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                "cookie": this.cookie
            }
        })

        if (!response.ok)
            throw new ServicoIndisponivelException("O serviço da Shopee não está disponível!")

        return await response.json() as iShopeeResponse
    }
}

