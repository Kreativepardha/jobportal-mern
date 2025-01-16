import express from 'express'
import { userRouter } from './userRouter'
import { companyRouter } from './companyRouter'
import isAuthenticated from '../middlewares/isAuthenticated'
import { jobRouter } from './jobRouter'
import { applicationRouter } from './applicationRouter'

const router = express.Router()

router.use("/user", userRouter)
router.use("/company",isAuthenticated ,companyRouter)
router.use("/job",isAuthenticated,jobRouter)
router.use("/apply",isAuthenticated,applicationRouter)

export {
    router as mainRouter
}