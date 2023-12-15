import { iRastreio } from "../utils/interfaces.js";

export default interface iProvider {
    track: (code: string) => Promise<iRastreio>
}