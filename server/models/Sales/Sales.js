import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    vatTax:{
        type:Number,
        default: 0
    },
    discount:{
        type:Number,
        default: 0
    },
    otherCost:{
        type:Number,
        default: 0
    },
    shippingCost:{
        type:Number,
        require: true
    },
    total:{
        type:Number,
        require: true
    },
    grantTotal:{
        type:Number,
        require:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{timestamps: true}
);

export default mongoose.model("Sales", SalesSchema)