import axios from 'axios'
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

    track = async (code: string): Promise<iRastreio> => {
        try {
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
        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error;
            } else {
                throw new Error("Internal error when trying to fetch API.");
            }
        }
        

    }
}