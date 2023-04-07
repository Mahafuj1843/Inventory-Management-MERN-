import Sales from "../models/Sales/Sales.js"
import SalesProduct from "../models/Sales/SalesProduct.js"
import { oneJoinlistService } from "../services/common/oneJoinService.js"
import { parentChildCreateService, parentChildDeleteService } from "../services/common/parentChildService.js"
import { parentChildsById } from "../services/common/parentChildsById.js"
import { summaryService } from "../services/common/summary.js"
import { threeJoinReportService } from "../services/report/reportService.js"


export const createSales = async (req, res) =>{
    let result = await parentChildCreateService(req, Sales, SalesProduct, 'salesId')
    res.status(200).json(result)
}

export const listSales = async (req,res,next) =>{
    let searchRgx = {'$regex': req.params.searchKey, '$options': 'i'}
    let searchArray = [{'Customer.name': searchRgx},{'Customer.phone': searchRgx},{'Customer.email': searchRgx}]
    let joinStage = {$lookup: {from: 'customers', localField: 'customerId', foreignField: '_id', as: 'Customer'}}
    let result =await oneJoinlistService(req, Sales, searchArray, joinStage)
    if(result) res.status(200).json(result)
}

export const deleteSales = async (req,res,next) =>{
    let result = await parentChildDeleteService(req, Sales, SalesProduct, 'salesId')
    if(result) res.status(200).json(result)
}

export const salesProducts = async (req, res) =>{
    let joinStage = {$lookup: {from: 'products', localField: 'productId', foreignField: '_id', as: 'Product'}}
    let result = await parentChildsById(req, SalesProduct, 'salesId', joinStage)
    if(result) res.status(200).json(result)
}

export const salesReportByDate = async(req, res) =>{
    let Result=await threeJoinReportService(req, SalesProduct)
    res.status(200).json(Result)
}

export const salesSummary = async(req, res) =>{
    let Result=await summaryService(req, Sales)
    res.status(200).json(Result)
}