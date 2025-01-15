import express from 'express'
import { userRouter } from './userRouter'

const router = express.Router()

router.use("/user", userRouter)
router.use("/company")
router.use("/job")
router.use("/application")

export {
    router as mainRouter
}