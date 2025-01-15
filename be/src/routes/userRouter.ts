import express from 'express'
import { upload } from '../middlewares/upload'
import { login, logout, register, updateProfile } from '../controllers/userController'


const router = express.Router()

router.post("/register", upload.single("profilePhoto"), register)
router.post("/login", login)
router.get("/logout", logout)
router.get("/update", upload.single("profilePhoto"), updateProfile)


export {
    router as userRouter
}