import express from "express"
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/jobController"

const router = express.Router()

router.post("/", postJob)
router.get("/", getAllJobs)
router.get("/adminjob", getAdminJobs)
router.get("/:id", getJobById)


export {
    router as jobRouter
}






