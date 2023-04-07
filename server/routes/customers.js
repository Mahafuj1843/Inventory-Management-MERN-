import express from 'express'
import { createCustomer, customerDropdown, deleteCustomer, listCustomer, updateCustomer, customerDetailsById } from '../controllers/customerController.js'
import { verifyToken } from '../middlewares/verify.js'

const router = express.Router()

router.post('/', verifyToken, createCustomer)
router.get('/List/:pageNo/:perPage/:searchKey', verifyToken, listCustomer)
router.get('/dropDown', verifyToken, customerDropdown)
router.get('/details/:id', verifyToken, customerDetailsById)
router.put('/:id', verifyToken, updateCustomer)
router.delete('/:id', verifyToken, deleteCustomer)

export default router 