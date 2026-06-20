import express from 'express';
import dotenv from "dotenv"
import connectDB  from './config/db.js';
import TodoRoutes from './routes/todo.route.js'

dotenv.config()
const app = express();

app.use(express.json());
const port = process.env.PORT

app.use('/api/v1/todo', TodoRoutes)

connectDB().then(() => {
    app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})})