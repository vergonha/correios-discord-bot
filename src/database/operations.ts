import Usuario from "./schemas/usuario.js";

const CorreiosDB = {
    create: async (id: string, name: string, code: string) => {
        const user = new Usuario({
            id: id,
            codigos: {
                nome: name,
                codigo: code
            }
        })

        return await user.save()
    },

    update: async (id: string, name: string, code: string) => {
        return await Usuario.findOneAndUpdate(
            {id: id},
            {
                $push: {
                    codigos: {
                        nome: name,
                        codigo: code
                    }
                }
            }
        )
    },

    search: async (id: string) => {
        const user = await Usuario.findOne({id: id}, { _id: 0, _v: 0})
        return user
    },

    all: async () => {
        return Usuario.find({})
    }
}

export default CorreiosDB