import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from 'helmet'
import connectDB from "./utils/db";
import { mainRouter } from "./routes";
dotenv.config();
const app = express();

app.use('/uploads', express.static(path.join(__dirname, "../uploads")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet())
app.use(cors())

const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/myapp";
export const JWT_SECRET = process.env.JWT_SECRET

app.use("/api/v1", mainRouter)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on PORT ::${PORT}`)
})