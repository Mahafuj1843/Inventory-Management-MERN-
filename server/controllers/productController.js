import fs from 'fs'
import Product from "../models/Product.js"
import SalesProduct from "../models/Sales/SalesProduct.js"
import PurchaseProduct from "../models/Purchase/PurchaseProduct.js"
import ReturnProduct from "../models/Return/ReturnProduct.js"
import { CheckAssociateService } from '../services/common/checkAssociationService.js';
import { detailsByIDService } from "../services/common/detailsByIdService.js"
import { createService, deleteService, updateService, dropDownService } from '../services/common/createService.js'
import { twoJoinlistService } from '../services/common/twoJoinService.js';
import { createError } from "../utils/error.js";
import mongoose from 'mongoose'

export const createProduct = async (req, res, next) => {
    let result = await createService(req, Product)
    if (result) res.status(200).send('Product has been created.')
}

export const productDetailsById = async (req,res,next) =>{
    let result =await detailsByIDService(req, Product)
    if(result) res.status(200).json(result)
}

export const updateProduct = async (req, res, next) => {
    let result = await updateService(req, Product)
    if (result) res.status(200).send('Product has been updated.')
}

export const listProduct = async (req, res, next) => {
    let searchRgx = { '$regex': req.params.searchKey, '$options': 'i' }
    let searchArray = [{ title: searchRgx }, { 'Category.title': searchRgx }, { 'Brand.title': searchRgx }]
    let joinStage_1 = { $lookup: { from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'Category' } }
    let joinStage_2 = { $lookup: { from: 'brands', localField: 'brandId', foreignField: '_id', as: 'Brand' } }
    let result = await twoJoinlistService(req, Product, searchArray, joinStage_1, joinStage_2)
    if (result) res.status(200).json(result)
}

// export const getAllProduct = async (req,res,next) =>{
//     try{
//         const products = await Product.find().sort("-createdAt");
//         res.status(200).json(products)
//     }catch(err){
//         next(err)
//     }
// }

export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(
            req.params.id,
        );
        if (!product) return next(createError(404, "Product not found."));
        else res.status(200).json(product)
    } catch (err) {
        next(err);
    }
}

// export const updateProduct = async (req,res,next) =>{
//     try{
//         const product = await Product.findById(
//             req.params.id,
//         );
//         if(!product) return next(createError(404, "Product not found."));
//         else{
//             if(req.file){
//                 fs.unlink(product.image, (err)=>{
//                     if(err) next(err);
//                 });
//                 req.body.image = req.file.path;
//             }
//             const updatedProduct = await Product.findByIdAndUpdate(
//                 req.params.id,
//                 { $set : req.body}, 
//                 { new : true});
//             res.status(200).json(updatedProduct)
//         }
//     }catch(err){
//         next(err);
//     }
// }

export const deleteProduct = async (req, res, next) => {
    try {
        let CheckSalesAssociate = await CheckAssociateService({ productId: mongoose.Types.ObjectId(req.params.id) }, SalesProduct);
        let CheckPurchaseAssociate = await CheckAssociateService({ productId: mongoose.Types.ObjectId(req.params.id) }, PurchaseProduct);
        let CheckReturnAssociate = await CheckAssociateService({ productId: mongoose.Types.ObjectId(req.params.id) }, ReturnProduct);

        if (CheckReturnAssociate) {
            res.status(200).json({ status: "associate", data: "Associate with Return" })
        }
        else if (CheckPurchaseAssociate) {
            res.status(200).json({ status: "associate", data: "Associate with Purchase" })
        }
        else if (CheckSalesAssociate) {
            res.status(200).json({ status: "associate", data: "Associate with Sales" })
        }
        else {
            let Result = await deleteService(req, Product);
            if(Result) res.status(200).send("Product has been delete.")
        }
    } catch (err) {
        next(err);
    }
}

export const productDropdown = async (req,res,next) =>{
    let result =await dropDownService(req, Product, {_id:1, title:1})
    if(result) res.status(200).json(result)
}