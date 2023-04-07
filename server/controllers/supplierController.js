import mongoose from "mongoose"
import Supplier from "../models/Supplier.js"
import Purchase from "../models/Purchase/Purchase.js"
import { CheckAssociateService } from "../services/common/checkAssociationService.js"
import { detailsByIDService } from "../services/common/detailsByIdService.js"
import { createService, deleteService, dropDownService, listService, updateService } from '../services/common/createService.js'

export const createSupplier = async (req,res,next) =>{
    let result =await createService(req, Supplier)
    if(result) res.status(200).send('Supplier has been created.')
}

export const updateSupplier = async (req,res,next) =>{
    let result =await updateService(req, Supplier)
    if(result) res.status(200).send('Supplier has been updated.')
}

export const deleteSupplier = async (req,res,next) =>{
    let CheckAssociate= await CheckAssociateService({supplierId: mongoose.Types.ObjectId(req.params.id)}, Purchase);
    if(CheckAssociate){
        res.status(200).json({status: "associate", data: "Associate with Purchase"})
    }
    else{
        let Result=await deleteService(req, Supplier);
        if(Result) res.status(200).send("Supplier has been Deleted.")
    }
}

export const supplierDetailsById = async (req,res,next) =>{
    let result =await detailsByIDService(req, Supplier)
    if(result) res.status(200).json(result)
}

export const listSupplier = async (req,res,next) =>{
    let searchRgx = {'$regex': req.params.searchKey, '$options': 'i'}
    let searchArray = [{name: searchRgx},{phone: searchRgx},{email: searchRgx},{address: searchRgx}]
    let result =await listService(req, Supplier, searchArray)
    if(result) res.status(200).json(result)
}

export const supplierDropdown = async (req,res,next) =>{
    let result =await dropDownService(req, Supplier, {_id:1, name:1})
    if(result) res.status(200).json(result)
}

