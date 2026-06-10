import { connect } from "mongoose"
import { config } from "dotenv"
config()
const connectDb = async () => {
  
  try {
 console.log("URI:", process.env.URI_DB)
    await connect(process.env.URI_DB)
    console.log("Se ha conectado a la db de MongoDb")

   }
  catch (error) {
    console.log("error de conexion a la db de MongoDb", error)
  }

}

export{connectDb}