import CorreiosDB from "../database/operations.js";

const getCodes = async (userId: string) => {
    const user = await CorreiosDB.search(userId)
    let codes;

    if (user) {
        codes = user.codigos;
    } else {
        return
    }

    const roles: any = codes.map(_ => {
        const name = _.nome
        const code = _.codigo
        return { label: `${name} 📦`, value: code, description: code }
    })

    return roles

}

export default getCodes