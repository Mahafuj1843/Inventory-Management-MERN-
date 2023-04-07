import express from 'express'
import { createSupplier, deleteSupplier, listSupplier, supplierDropdown, updateSupplier, supplierDetailsById } from '../controllers/supplierController.js'
import { verifyToken } from '../middlewares/verify.js'

const router = express.Router()

router.post('/', verifyToken, createSupplier)
router.get('/List/:pageNo/:perPage/:searchKey', verifyToken, listSupplier)
router.get('/dropDown', verifyToken, supplierDropdown)
router.get('/details/:id', verifyToken, supplierDetailsById)
router.put('/:id', verifyToken, updateSupplier)
router.delete('/:id', verifyToken, deleteSupplier)

export default router