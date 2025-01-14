import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from 'helmet'
import connectDB from "./utils/db";
import { mainRouter } from "./routes";
dotenv.config();
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet())
app.use(cors())

const PORT = process.env.PORT || 3000;

app.use("/api/v1", mainRouter)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on PORT ::${PORT}`)
})