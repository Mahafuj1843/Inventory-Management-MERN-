import Return from "../models/Return/Return.js"
import ReturnProduct from "../models/Return/ReturnProduct.js"
import { oneJoinlistService } from "../services/common/oneJoinService.js"
import { parentChildCreateService, parentChildDeleteService } from "../services/common/parentChildService.js"
import { parentChildsById } from "../services/common/parentChildsById.js"
import { summaryService } from "../services/common/summary.js"
import { threeJoinReportService } from "../services/report/reportService.js"


export const createReturn = async (req, res) =>{
    let result = await parentChildCreateService(req, Return, ReturnProduct, 'returnId')
    res.status(200).json(result)
}

export const listReturn = async (req,res,next) =>{
    let searchRgx = {'$regex': req.params.searchKey, '$options': 'i'}
    let searchArray = [{'Customer.name': searchRgx},{'Customer.phone': searchRgx},{'Customer.email': searchRgx}]
    let joinStage = {$lookup: {from: 'customers', localField: 'customerId', foreignField: '_id', as: 'Customer'}}
    let result =await oneJoinlistService(req, Return, searchArray, joinStage)
    if(result) res.status(200).json(result)
}

export const deleteReturn = async (req,res,next) =>{
    let result = await parentChildDeleteService(req, Return, ReturnProduct, 'returnId')
    if(result) res.status(200).json(result)
}

export const returnProducts = async (req, res) =>{
    let joinStage = {$lookup: {from: 'products', localField: 'productId', foreignField: '_id', as: 'Product'}}
    let result = await parentChildsById(req, ReturnProduct, 'returnId', joinStage)
    if(result) res.status(200).json(result)
}

export const returnReportByDate = async(req, res) =>{
    let Result=await threeJoinReportService(req, ReturnProduct)
    res.status(200).json(Result)
}

export const returnSummary = async(req, res) =>{
    let Result=await summaryService(req, Return)
    res.status(200).json(Result)
}