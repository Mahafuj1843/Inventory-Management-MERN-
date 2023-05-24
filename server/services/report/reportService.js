import mongoose from "mongoose"

export const expenseReportService= async (Req, Model) => {
    try{
        let data = await Model.aggregate([
            {$match: {userId: mongoose.Types.ObjectId(Req.user.id), createdAt:{$gte:new Date(Req.body.fromDate),$lte:new Date(Req.body.toDate)}}},
            {
                $facet:{
                    Total:[{
                        $group:{
                            _id:0,
                            totalAmount:{$sum:"$total"}
                        }
                    }],
                    Rows:[
                        {$lookup: {from: "expensetypes", localField: "typeId", foreignField: "_id", as: "Type"}}
                    ],
                }
            }
        ])
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}

export const threeJoinReportService= async (Req, Model) => {
    try{
        let data=await  Model.aggregate([
            {$match: {userId: mongoose.Types.ObjectId(Req.user.id), createdAt:{$gte:new Date(Req.body.fromDate),$lte:new Date(Req.body.toDate)}}},
            {
                $facet:{
                    Total:[{
                        $group:{
                            _id:0,
                            TotalAmount:{$sum:"$total"}
                        }
                    }],
                    Rows:[
                        {$lookup: {from: "products", localField: "productId", foreignField: "_id", as: "products"}},
                        {$unwind : "$products" },
                        {$lookup: {from: "brands", localField: "products.brandId", foreignField: "_id", as: "Brand"}},
                        {$lookup: {from: "categories", localField: "products.categoryId", foreignField: "_id", as: "Categorie"}}
                    ],
                }
            }
        ])


        return {status: "success", data: data}

    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}