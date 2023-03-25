import express from 'express'
import { brandDropdown, createBrand, deleteBrand, listBrand, updateBrand } from '../controllers/brandController.js'
import { verifyToken } from '../middlewares/verify.js'

const router = express.Router()

router.post('/', verifyToken, createBrand)
router.get('/List/:pageNo/:perPage/:searchKey', verifyToken, listBrand)
router.get('/dropDown', verifyToken, brandDropdown)
router.put('/:id', verifyToken, updateBrand)
router.delete('/:id', verifyToken, deleteBrand)

export default router