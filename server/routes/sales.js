import express from 'express'
import { createSales, deleteSales, listSales, salesProducts, salesReportByDate, salesSummary } from '../controllers/salesController.js'
import { verifyToken } from '../middlewares/verify.js'

const router = express.Router()

router.post('/', verifyToken, createSales)
router.get('/List/:pageNo/:perPage/:searchKey', verifyToken, listSales)
router.get('/products/:id', verifyToken, salesProducts)
// router.put('/:id', verifyToken, updateBrand)
router.delete('/:id', verifyToken, deleteSales)
router.post('/report', verifyToken, salesReportByDate)
router.get('/summary', verifyToken, salesSummary)

export default router