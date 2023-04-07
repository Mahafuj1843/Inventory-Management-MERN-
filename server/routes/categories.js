import express from 'express'
import { categoryDropdown, createCategory, deleteCategory, listCategory, updateCategory, categoryDetailsByID } from '../controllers/categoryController.js'
import { verifyToken } from '../middlewares/verify.js'

const router = express.Router()

router.post('/', verifyToken, createCategory)
router.get('/List/:pageNo/:perPage/:searchKey', verifyToken, listCategory)
router.get('/details/:id', verifyToken, categoryDetailsByID)
router.get('/dropDown', verifyToken, categoryDropdown)
router.put('/:id', verifyToken, updateCategory)
router.delete('/:id', verifyToken, deleteCategory)

export default router