import express from "express"

const router = express.Router()

router.post("/")
router.get("/")
router.get("/adminjob")
router.get("/:id")


export {
    router as jobRouter
}






