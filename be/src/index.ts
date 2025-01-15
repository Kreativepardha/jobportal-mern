import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from 'helmet'
import connectDB from "./utils/db";
import { mainRouter } from "./routes";
import path from 'path'
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middlewares/errorMiddleware";
import { timeStamp } from "console";
import { setupSwagger } from "./swagger";


dotenv.config();
export const app = express();

app.use('/uploads', express.static(path.join(__dirname, "../uploads")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(errorHandler)
app.use(cors())
setupSwagger(app);


const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/myapp";
export const JWT_SECRET = process.env.JWT_SECRET || "moiKey"


app.get("/health", (req,res) => {
    status:"UP",
    timeStamp: new Date().toISOString(),
})
app.use("/api/v1", mainRouter)



app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on PORT ::${PORT}`)
})