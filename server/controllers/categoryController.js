import mongoose from "mongoose"
import Category from "../models/Category.js"
import Product from "../models/Product.js"
import { CheckAssociateService } from "../services/common/checkAssociationService.js"
import { createService, deleteService, dropDownService, listService, updateService } from '../services/common/createService.js'
import { detailsByIDService } from "../services/common/detailsByIdService.js"

export const createCategory = async (req,res,next) =>{
    let result =await createService(req, Category)
    if(result) res.status(200).send('Category has been created.')
}

export const updateCategory = async (req,res,next) =>{
    let result =await updateService(req, Category)
    if(result) res.status(200).send('Category has been updated.')
}

export const deleteCategory = async (req,res,next) =>{
    let checkAssociate = await CheckAssociateService({categoryId: mongoose.Types.ObjectId(req.params.id)}, Product)
    if(checkAssociate)
        res.status(200).json({msg: "Associate with Product"})
    else{
        let Result=await deleteService(req, Category);
        res.status(200).json(Result)
    }
}

export const categoryDetailsByID=async (req, res) => {
    let Result= await detailsByIDService(req, Category)
    res.status(200).json(Result)
}

export const listCategory = async (req,res,next) =>{
    let searchRgx = {'$regex': req.params.searchKey, '$options': 'i'}
    let searchArray = [{title: searchRgx}]
    let result =await listService(req, Category, searchArray)
    if(result) res.status(200).json(result)
}

export const categoryDropdown = async (req,res,next) =>{
    let result =await dropDownService(req, Category, {_id:1, title:1})
    if(result) res.status(200).json(result)
}

