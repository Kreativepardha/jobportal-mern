import express from 'express'
import { upload } from '../middlewares/upload'
import { login, logout, register, updateProfile } from '../controllers/userController'
import isAuthenticated from '../middlewares/isAuthenticated'


const router = express.Router()
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     responses:
 *       201:
 *         description: Account created successfully
 */

router.post("/register", upload.single("profilePhoto"), register)
router.post("/login", login)
router.get("/logout", logout)
router.get("/update",isAuthenticated ,upload.single("profilePhoto"), updateProfile)


export {
    router as userRouter
}