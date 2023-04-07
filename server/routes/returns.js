import express from 'express'
import { createReturn, deleteReturn, listReturn, returnProducts, returnReportByDate, returnSummary } from '../controllers/returnController.js'
import { verifyToken } from '../middlewares/verify.js'

const router = express.Router()

router.post('/', verifyToken, createReturn)
router.get('/List/:pageNo/:perPage/:searchKey', verifyToken, listReturn)
router.get('/products/:id', verifyToken, returnProducts)
// router.put('/:id', verifyToken, updateBrand)
router.delete('/:id', verifyToken, deleteReturn)
router.post('/report', verifyToken, returnReportByDate)
router.get('/summary', verifyToken, returnSummary)

export default router