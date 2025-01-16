import express from 'express'
import { userRouter } from './userRouter'
import { companyRouter } from './companyRouter'
import isAuthenticated from '../middlewares/isAuthenticated'
import { jobRouter } from './jobRouter'

const router = express.Router()

router.use("/user", userRouter)
router.use("/company",isAuthenticated ,companyRouter)
router.use("/job",isAuthenticated,jobRouter)
router.use("/application")

export {
    router as mainRouter
}