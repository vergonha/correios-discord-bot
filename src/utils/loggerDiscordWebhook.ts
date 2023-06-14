import Transport from 'winston-transport'
import axios, { AxiosInstance } from 'axios'

export default class DiscordHook extends Transport {
    private readonly url: string
    private readonly session: AxiosInstance

    constructor(opts?: any){
        super(opts)
        opts = opts || {};
        this.url = opts.url
        this.session = axios.create()

    }


    async log(info: any, callback: any){
        if(!this.url){
            return
        }

        this.session.post(this.url, { content: `${info.timestamp} [${info.label}] ${info.level}: ${info.message}` })
        callback()
    }
}
