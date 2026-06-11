import {Schema, model} from "mongoose"

const TaskSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    complete: { type: Boolean, default: false },
    userId:{type: Schema.Types.ObjectId, ref:"User", required: true}
  },
  {
      versionKey: false,
      timestamps:true
  }
  )

const Task = model("Product", TaskSchema)
  

export {Task}