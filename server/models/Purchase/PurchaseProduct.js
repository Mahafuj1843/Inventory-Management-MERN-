import mongoose from "mongoose";

const PurchaseProductSchema = new mongoose.Schema({
    purchaseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Purchase"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    qty:{
        type:Number,
        require: true
    },
    price:{
        type:Number,
        require: true
    },
    total:{
        type:Number,
        require: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{timestamps: true}
);

export default mongoose.model("PurchaseProduct", PurchaseProductSchema)