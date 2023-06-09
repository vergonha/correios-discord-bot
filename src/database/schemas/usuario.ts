import { Schema } from "mongoose";
import mongoose from "mongoose";

const ProdutoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },

    codigo: {
        type: String,
        required: true
    },

    ultimaAtualizacao: {
        type: String,
        required: true
    }
})

const UsuarioSchema = new Schema({
    id: {
        type: Number,
        required: true,
        index: {
            unique: true,
            dropDups: true
        }
    },

    codigos: {
        type: [ProdutoSchema],
        required: true
    }
})

const Usuario = mongoose.model("usuario", UsuarioSchema)
Usuario.createIndexes()

export default Usuario