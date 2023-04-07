import express from 'express'
import { createExpense, createExpenseType, deleteExpense, deleteExpenseType, expenseReportByDate, expenseSummary, expenseTypeDropdown, expenseTypeDetailsById, listExpense, listExpenseType, updateExpense, expenseDetailsById, updateExpenseType } from '../controllers/expenseController.js'
import { verifyToken } from '../middlewares/verify.js'

const router = express.Router()

router.post('/type', verifyToken, createExpenseType)
router.get('/typeList/:pageNo/:perPage/:searchKey', verifyToken, listExpenseType)
router.get('/type/dropDown', verifyToken, expenseTypeDropdown)
router.get('/type/details/:id', verifyToken, expenseTypeDetailsById)
router.put('/type/:id', verifyToken, updateExpenseType)
router.delete('/type/:id', verifyToken, deleteExpenseType)

router.post('/', verifyToken, createExpense)
router.get('/details/:id', verifyToken, expenseDetailsById)
router.put('/:id', verifyToken, updateExpense) 
router.get('/list/:pageNo/:perPage/:searchKey', verifyToken, listExpense)
router.delete('/:id', verifyToken, deleteExpense)
router.post('/report', verifyToken, expenseReportByDate)
router.get('/summary', verifyToken, expenseSummary)

export default router