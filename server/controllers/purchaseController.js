import Purchase from "../models/Purchase/Purchase.js"
import PurchaseProduct from "../models/Purchase/PurchaseProduct.js"
import { oneJoinlistService } from "../services/common/oneJoinService.js"
import { parentChildCreateService, parentChildDeleteService } from "../services/common/parentChildService.js"
import { summaryService } from "../services/common/summary.js"
import { threeJoinReportService } from "../services/report/reportService.js"


export const createPurchase = async (req, res) =>{
    let result = await parentChildCreateService(req, Purchase, PurchaseProduct, 'purchaseId')
    res.status(200).json(result)
}

export const listPurchase = async (req,res,next) =>{
    let searchRgx = {'$regex': req.params.searchKey, '$options': 'i'}
    let searchArray = [{'Supplier.name': searchRgx},{'Supplier.phone': searchRgx},{'Supplier.email': searchRgx}]
    let joinStage = {$lookup: {from: 'suppliers', localField: 'supplierId', foreignField: '_id', as: 'Supplier'}}
    let result =await oneJoinlistService(req, Purchase, searchArray, joinStage)
    if(result) res.status(200).json(result)
}

export const deletePurchase = async (req,res,next) =>{
    let result = await parentChildDeleteService(req, Purchase, PurchaseProduct, 'purchaseId')
    if(result) res.status(200).json(result)
}

export const purchaseReportByDate = async(req, res) =>{
    let Result=await threeJoinReportService(req, PurchaseProduct)
    res.status(200).json(Result)
}

export const purchaseSummary = async(req, res) =>{
    let Result=await summaryService(req, Purchase)
    res.status(200).json(Result)
}