import express from 'express'


const router = express.Router()

router.post("/register")
router.post("/login")
router.get("/logout")
router.get("/update")


export {
    router as userRouter
}