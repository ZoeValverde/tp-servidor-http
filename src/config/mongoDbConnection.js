import {connect} from "mongoose"

const connectDb = async () => {
  
  try {

    await connect("mongodb://localhost:27017/products_db")
    console.log("se conecto al db")

   }
  catch (error) {
    console.log("error conexion db", error.message)
  }

}

export{connectDb}