import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
    supplierId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
    },
    vatTax:{
        type:Number
    },
    discount:{
        type:Number
    },
    otherCost:{
        type:Number
    },
    shippingCost:{
        type:Number,
        require: true
    },
    total:{
        type:Number,
        require: true
    },
    note:{
        type:String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{timestamps: true}
);

export default mongoose.model("Purchase", PurchaseSchema)