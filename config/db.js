import mongoose from "mongoose";

const connectDB = async() => {
    const dbUrl = process.env.MONGO_URI
    try {
        const conn = await mongoose.connect(dbUrl)
        console.log('MongoDB connected successfully')
    } catch(err){
        console.log("MongoDB Connection Failed", err)
        process.exit(1)
    }
}

export default connectDB