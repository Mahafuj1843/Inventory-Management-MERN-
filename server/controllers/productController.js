import fs from 'fs'
import Product from "../models/Product.js"
import { createError } from "../utils/error.js";

export const createProduct = async (req,res,next)=>{
    try{
        var newProduct = new Product({
            title : req.body.title,
            slug : req.body.slug,
            desc : req.body.desc,
            price : req.body.price,
            quantity : req.body.quantity,
            image : req.file.path
        });
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        next(err);
    }
}

export const getAllProduct = async (req,res,next) =>{
    try{
        const products = await Product.find().sort("-createdAt");
        res.status(200).json(products)
    }catch(err){
        next(err)
    }
}

export const getProduct = async (req,res,next) =>{
    try{
        const product = await Product.findById(
            req.params.id,
        );
        if(!product) return next(createError(404, "Product not found."));
        else res.status(200).json(product)
    }catch(err){
        next(err);
    }
}

export const updateProduct = async (req,res,next) =>{
    try{
        const product = await Product.findById(
            req.params.id,
        );
        if(!product) return next(createError(404, "Product not found."));
        else{
            if(req.file){
                fs.unlink(product.image, (err)=>{
                    if(err) next(err);
                });
                req.body.image = req.file.path;
            }
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                { $set : req.body}, 
                { new : true});
            res.status(200).json(updatedProduct)
        }
    }catch(err){
        next(err);
    }
}

export const deleteProduct = async (req,res,next) =>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product) return next(createError(404, "Product not found."));
        else {
            fs.unlink(product.image, (err)=>{
                if(err) next(err);
            });
            await product.remove();
            res.status(200).json("User has been deleted.")
        }
    }catch(err){
        next(err);
    }
}