import { Router } from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/applicationController";

const router = Router()

router.get("/:id", applyJob)
router.get("/", getAppliedJobs)
router.get("/:id/applicants",getApplicants)
router.post("/status/:id/update",updateStatus)



export {
    router as applicationRouter
}