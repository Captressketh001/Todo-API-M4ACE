import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true, 'Title is required'],
        minLength:[3, 'Title must be at least 3 character'],
        maxLength: [20, 'Title cannnot exceed 20 character']
    },
    description: {
        type: String,
        required:[true, 'Description is required'],
        minLength:[3, 'Description must be at least 3 character'],
        maxLength: [200, 'Description cannnot exceed 200 character']
    }, 
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    }
},
    {timestamps: true}
)

const TodoSchema = mongoose.model("Todo", todoSchema)
export default TodoSchema;