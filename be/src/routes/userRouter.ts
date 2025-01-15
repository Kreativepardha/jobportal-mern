import express from 'express'
import { upload } from '../middlewares/upload'
import { register, updateProfile } from '../controllers/userController'


const router = express.Router()

router.post("/register", upload.single("profilePhoto"), register)
router.post("/login")
router.get("/logout")
router.get("/update", upload.single("profilePhoto"), updateProfile)


export {
    router as userRouter
}