import { Router } from "express";

const router = Router()

router.get("/:id")
router.get("/")
router.get("/:id/applicants")
router.post("/status/:id/update")



export {
    router as applicationRouter
}