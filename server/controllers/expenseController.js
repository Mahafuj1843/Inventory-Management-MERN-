import ExpenseType from "../models/Expense/ExpenseType.js"
import Expense from "../models/Expense/Expense.js"
import { createService, deleteService, dropDownService, listService, updateService } from '../services/common/createService.js'
import { oneJoinlistService } from "../services/common/oneJoinService.js"
import { detailsByIDService } from "../services/common/detailsByIdService.js"
import { CheckAssociateService } from "../services/common/checkAssociationService.js"
import { expenseReportService } from "../services/report/reportService.js"
import mongoose from "mongoose"
import { summaryService } from "../services/common/summary.js"

export const createExpenseType = async (req,res,next) =>{
    let result =await createService(req, ExpenseType)
    if(result) res.status(200).send('ExpenseType has been created.')
}

export const updateExpenseType = async (req,res,next) =>{
    let result =await updateService(req, ExpenseType)
    if(result) res.status(200).send('ExpenseType has been updated.')
}

export const expenseTypeDetailsById = async (req,res,next) =>{
    let result =await detailsByIDService(req, ExpenseType)
    if(result) res.status(200).json(result)
}

export const deleteExpenseType = async (req,res,next) =>{
    let CheckAssociate= await CheckAssociateService({typeId: mongoose.Types.ObjectId(req.params.id)}, Expense);
    if(CheckAssociate){
        res.status(200).json({status: "associate", data: "Associate with Expense"})
    }
    else{
        let Result=await deleteService(req, ExpenseType);
        if(Result) res.status(200).send("Expense Type has been Deleted.")
    }
}

export const listExpenseType = async (req,res,next) =>{
    let searchRgx = {'$regex': req.params.searchKey, '$options': 'i'}
    let searchArray = [{title: searchRgx}]
    let result =await listService(req, ExpenseType, searchArray)
    if(result) res.status(200).json(result)
}

export const expenseTypeDropdown = async (req,res,next) =>{
    let result =await dropDownService(req, ExpenseType, {_id:1, title:1})
    if(result) res.status(200).json(result)
}

export const createExpense = async (req,res,next) =>{
    let result =await createService(req, Expense)
    if(result) res.status(200).send('Expense has been created.')
}

export const expenseDetailsById = async (req,res,next) =>{
    let result =await detailsByIDService(req, Expense)
    if(result) res.status(200).json(result)
}

export const updateExpense = async (req,res,next) =>{
    let result =await updateService(req, Expense)
    if(result) res.status(200).send('Expense has been updated.')
}

export const deleteExpense = async (req,res,next) =>{
    let result =await deleteService(req, Expense)
    if(result) res.status(200).send('Expense has been deleted.')
}

export const listExpense = async (req,res,next) =>{
    let searchRgx = {'$regex': req.params.searchKey, '$options': 'i'}
    let searchArray = [{'Type.title': searchRgx}]
    let joinStage = {$lookup: {from: 'expensetypes', localField: 'typeId', foreignField: '_id', as: 'Type'}}
    let result =await oneJoinlistService(req, Expense, searchArray, joinStage)
    if(result) res.status(200).json(result)
}

export const expenseReportByDate = async(req, res) =>{
    let Result=await expenseReportService(req, Expense)
    res.status(200).json(Result)
}

export const expenseSummary = async(req, res) =>{
    let Result=await summaryService(req, Expense)
    res.status(200).json(Result)
}

