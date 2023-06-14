import mongoose from 'mongoose'
import dotenv from 'dotenv'
import logger from '../logger.js'

dotenv.config()

const connectionString = process.env.MONGODB_CONNECTION_STRING
export default function connection(){
    if(!connectionString){
        logger.error("🍂 Verifique se o seu arquivo .ENV está preenchido corretamente.")
        process.exit()
    }

    mongoose.connect(connectionString)
        .then(_ => {logger.info("🌿 Conexão com a database estabelecida.")})
        .catch(err => {
            logger.error("🍂 Erro ao estabelecer conexão com a database | Verifique se a String de conexão com o MongoDB é válida.")
            logger.error(err.message)
            process.exit()
        })
}
