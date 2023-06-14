import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectionString = process.env.MONGODB_CONNECTION_STRING
export default function connection(){
    if(!connectionString){
        console.log("🍂 Verifique se o seu arquivo .ENV está preenchido corretamente.")
        process.exit()
    }

    mongoose.connect(connectionString)
        .then(_ => {console.log("🌿 Conexão com a database estabelecida.")})
        .catch(err => {
            console.log("🍂 Erro ao estabelecer conexão com a database.")
            console.log("| Verifique se a String de conexão com o MongoDB é válida.")
            console.log(err.message)
            process.exit()
        })
}
