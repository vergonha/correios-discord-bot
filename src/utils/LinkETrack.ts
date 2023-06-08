import axios, { isAxiosError } from 'axios'
import dotenv from 'dotenv'
import { iRastreio } from './interfaces'

dotenv.config()

export default class LinkETrack {
    private readonly user: string
    private readonly token: string
    private readonly baseUrl: string

    constructor(){
        if(!process.env.LINKETRACK_USER || !process.env.LINKETRACK_API_KEY){
            throw new Error("User or API Key is missing from your .env file.")
        }

        this.user = process.env.LINKETRACK_USER
        this.token = process.env.LINKETRACK_API_KEY
        this.baseUrl = "https://api.linketrack.com/track/json"
    }

    fetch = async (code: string): Promise<iRastreio> => {
        const payload = {
            user: this.user,
            token: this.token,
            codigo: code
        }


        return axios.get<iRastreio>(this.baseUrl, {params: payload})
        .then(response => {
            const { data } = response
            return data;
        })
        

    }

    track = async (code: string): Promise<string | iRastreio> => {
        try {
            const response = await this.fetch(code)
            
            if(!response.eventos.length){
                return "Ainda não há atualização no pacote."
            }

            return response
        } catch (err) {
            if(isAxiosError(err)){
                if(err.response?.data as unknown == "Unauthorized") {
                
                    // Quando os substantivos pertencerem a gênero e número diferentes, 
                    // o adjetivo, exercendo o papel de adjunto adnominal, 
                    // deverá concordar com o mais próximo ou ir para o masculino plural.
    
                    return "Código de rastreio ou credenciais inválidos."
                }
            }

            return "Erro interno."
        }
    }
}