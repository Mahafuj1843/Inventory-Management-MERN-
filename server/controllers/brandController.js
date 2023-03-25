import mongoose from "mongoose"
import Brand from "../models/Brand.js"
import Product from "../models/Product.js"
import { CheckAssociateService } from "../services/common/checkAssociationService.js"
import { createService, deleteService, dropDownService, listService, updateService } from '../services/common/createService.js'
import { detailsByIDService } from "../services/common/detailsByIdService.js"

export const createBrand = async (req,res,next) =>{
    let result =await createService(req, Brand)
    if(result) res.status(200).send('Brand has been created.')
}

export const updateBrand = async (req,res,next) =>{
    let result =await updateService(req, Brand)
    if(result) res.status(200).send('Brand has been updated.')
}

export const deleteBrand = async (req,res,next) =>{
    let checkAssociate = await CheckAssociateService({brandId: mongoose.Types.ObjectId(req.params.id)}, Product)
    if(checkAssociate)
        res.status(200).json({msg: "Associate with Product"})
    else{
        let Result=await deleteService(req, Brand);
        res.status(200).json(Result)
    }
}

export const brandDetailsByID=async (req, res) => {
    let Result= await detailsByIDService(req, Brand)
    res.status(200).json(Result)
}

export const listBrand = async (req,res,next) =>{
    let searchRgx = {'$regex': req.params.searchKey, '$options': 'i'}
    let searchArray = [{title: searchRgx}]
    let result =await listService(req, Brand, searchArray)
    if(result) res.status(200).json(result)
}

export const brandDropdown = async (req,res,next) =>{
    let result =await dropDownService(req, Brand, {_id:1, title:1})
    if(result) res.status(200).json(result)
}

