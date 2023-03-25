import mongoose from "mongoose";

const ReturnSchema = new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Customer",
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

export default mongoose.model("Return", ReturnSchema)