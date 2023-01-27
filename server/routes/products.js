import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from '../controllers/productController.js'
import { verifyAdmin, verifyToken, verifyUser } from '../middlewares/verify.js'
import { upload } from '../utils/imageUplode.js'

const router = express.Router()

router.post('/', verifyAdmin, upload.single("image"), createProduct)
router.get('/', getAllProduct)
router.get('/:id', getProduct)
router.put('/:id', verifyAdmin, upload.single("image"), updateProduct)
router.delete('/:id', verifyAdmin, deleteProduct)

export default router