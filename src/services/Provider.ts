import { singleton } from "tsyringe"
import { iRastreio } from "../utils/interfaces.js";
import Magalu from "./Magalu/Magalu.js";
import iProvider from "./iProvider.js";

@singleton()
export default class RastreioProvider { 

    private readonly _provider: iProvider

    constructor() {
        this._provider = new Magalu()
    }

    track = async (code: string): Promise<iRastreio> => {
        return this._provider.track(code)
    }
}