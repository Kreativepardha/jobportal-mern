import express from 'express'
import { userRouter } from './userRouter'
import { companyRouter } from './companyRouter'
import isAuthenticated from '../middlewares/isAuthenticated'

const router = express.Router()

router.use("/user", userRouter)
router.use("/company",isAuthenticated ,companyRouter)
router.use("/job")
router.use("/application")

export {
    router as mainRouter
}