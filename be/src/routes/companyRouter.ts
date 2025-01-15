import express from 'express'
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/companyController'
import { upload } from '../middlewares/upload'



const router = express.Router()

router.post("/register", registerCompany)
router.get("/", getCompany)
router.get("/:id", getCompanyById)
router.put("/:id", upload.single("logo") ,updateCompany)

export {
    router as companyRouter
}