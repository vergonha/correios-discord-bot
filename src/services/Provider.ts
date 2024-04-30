import { singleton } from "tsyringe"
import { iRastreio } from "../utils/interfaces.js";
import Magalu from "./Magalu/Magalu.js";
import iProvider from "./iProvider.js";
import logger from "../logger.js";
import Shopee from "./Shopee/Shopee.js";

@singleton()
export default class RastreioProvider { 

    private readonly _providers: iProvider[]

    constructor() {
        this._providers = []
        this.register(new Magalu())
        if(process.env.SHOPEE_COOKIE) 
            this.register(new Shopee(process.env.SHOPEE_COOKIE))
    }

    register = (provider: iProvider) => {
        this._providers.push(provider)
    }

    track = async (code: string): Promise<iRastreio> => {
        let data;
        let errors: Error[] = [];

        for(const provider of this._providers) {
            try {
                data = await provider.track(code)
                // If the actual provider give a valid response, return it instead try with others.
                if(data) return data;
            } catch (error) {
                if(error instanceof Error)
                    errors.push(error)

                continue
            }
        }

        if(!data)
            throw(errors.slice(-1)[0])

        return data;
    }
}