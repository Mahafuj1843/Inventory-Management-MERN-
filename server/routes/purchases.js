import express from 'express'
import { createPurchase, deletePurchase, listPurchase, purchaseProducts, purchaseReportByDate, purchaseSummary } from '../controllers/purchaseController.js'
import { verifyAdmin, verifyToken, verifyUser } from '../middlewares/verify.js'

const router = express.Router()

router.post('/', verifyToken, createPurchase)
router.get('/List/:pageNo/:perPage/:searchKey', verifyToken, listPurchase)
router.get('/products/:id', verifyToken, purchaseProducts)
// router.put('/:id', verifyToken, updateBrand)
router.delete('/:id', verifyToken, deletePurchase)
router.post('/report', verifyToken, purchaseReportByDate)
router.get('/summary', verifyToken, purchaseSummary)

export default router