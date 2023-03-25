import express from 'express'
import { createProduct, deleteProduct, getProduct, listProduct, updateProduct } from '../controllers/productController.js'
import { verifyAdmin, verifyToken, verifyUser } from '../middlewares/verify.js'
import { upload } from '../utils/imageUplode.js'

const router = express.Router()

router.post('/', verifyToken, /*upload.single("image"),*/ createProduct)
router.get('/List/:pageNo/:perPage/:searchKey', verifyToken, listProduct)
router.get('/:id', getProduct)
router.put('/:id', verifyToken, /*upload.single("image"),*/ updateProduct)
router.delete('/:id', verifyToken, deleteProduct)

export default router