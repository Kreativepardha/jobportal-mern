import express from 'express'

const router = express.Router()

router.use("/user")
router.use("/company")
router.use("/job")
router.use("/application")

export {
    router as mainRouter
}