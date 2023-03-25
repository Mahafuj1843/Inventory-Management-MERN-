import mongoose from "mongoose"
import Customer from "../models/Customer.js"
import Sales from "../models/Sales/Sales.js"
import { CheckAssociateService } from "../services/common/checkAssociationService.js"
import { createService, deleteService, dropDownService, listService, updateService } from '../services/common/createService.js'

export const createCustomer = async (req,res,next) =>{
    let result =await createService(req, Customer)
    if(result) res.status(200).send('Customer has been created.')
}

export const updateCustomer = async (req,res,next) =>{
    let result =await updateService(req, Customer)
    if(result) res.status(200).send('Customer has been updated.')
}

export const deleteCustomer = async (req,res,next) =>{
    let CheckAssociate= await CheckAssociateService({customerId: mongoose.Types.ObjectId(req.params.id)}, Sales);
    if(CheckAssociate){
        res.status(200).json({status: "associate", data: "Associate with Sales"})
    }
    else{
        let Result=await deleteService(req, Customer);
        if(Result) res.status(200).send("Customer has been Deleted.")
    }
}

export const listCustomer = async (req,res,next) =>{
    let searchRgx = {'$regex': req.params.searchKey, '$options': 'i'}
    let searchArray = [{name: searchRgx},{phone: searchRgx},{email: searchRgx},{address: searchRgx}]
    let result =await listService(req, Customer, searchArray)
    if(result) res.status(200).json(result)
}

export const customerDropdown = async (req,res,next) =>{
    let result =await dropDownService(req, Customer, {_id:1, name:1})
    if(result) res.status(200).json(result)
}

