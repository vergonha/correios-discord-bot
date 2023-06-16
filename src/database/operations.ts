import Usuario from "./schemas/usuario.js";
import connection from "./connection.js";

const CorreiosDB = {
    create: async (id: string, name: string, code: string, time: string) => {
        const user = new Usuario({
            id: id,
            codigos: {
                nome: name,
                codigo: code,
                ultimaAtualizacao: time
            }
        })

        return await user.save()
    },

    append: async (id: string, name: string, code: string, time: string) => {
        return await Usuario.findOneAndUpdate(
            {id: id},
            {
                $push: {
                    codigos: {
                        nome: name,
                        codigo: code,
                        ultimaAtualizacao: time
                    }
                }
            }
        )
    },

    update: async (id: string, name: string, code: string, time: string) => {
        return await Usuario.findOneAndUpdate(
            {
                id: id,
                codigos: {
                    $elemMatch: {
                        codigo: code
                    }
                }
            },
            {
                $set: {
                    "codigos.$.nome": name,
                    "codigos.$.ultimaAtualizacao": time,
                    "codigos.$.codigo": code
                }
            }
        )
    },

    delete: async (id: string, code: string) => {
        return await Usuario.updateOne(
            {
                id: id,
                codigos: {
                    $elemMatch: {
                        codigo: code
                    }
                }
            },
            {
                $pull: {
                    codigos: {
                        codigo: code
                    }
                }
            }, { new: true }
        )
    },

    search: async (id: string) => {
        const user = await Usuario.findOne({id: id})
        return user
    },

    all: async () => {
        return Usuario.find({})
    }
}


export default CorreiosDB
