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

        const updateDate = (n: number) => moment(n * 1000)
        
        return {
            codigo: data.pc_shipping.forder_shipping_info_list[0].tracking_number,
            time: data.pc_shipping.forder_shipping_info_list[0].tracking_info_list[0].ctime,
            eventos: data.pc_shipping.forder_shipping_info_list[0].tracking_info_list.map(event => {
                return                 {
                    data: updateDate(event.ctime).format("DD/MM/YYYY"),
                    hora: updateDate(event.ctime).format("HH:mm"),
                    local: undefined,
                    status: event.description,
                    subStatus: undefined,
                }
            })
        }
    }

    fetch = async (code: string): Promise<iShopeeResponse> => {
        const params = new URLSearchParams({ "order_id": code }).toString()
        const response = await fetch(`${this.baseURL}?${params}`, {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                "cookie": this.cookie,
                "x-api-source": "pc"
            }
        })

        if (!response.ok)
            throw new ServicoIndisponivelException("O serviço da Shopee não está disponível!")

        return await response.json() as iShopeeResponse
    }
}

