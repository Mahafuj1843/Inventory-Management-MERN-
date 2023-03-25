import mongoose from "mongoose";

const SalesProductSchema = new mongoose.Schema({
    salesId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Sales"
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

export default mongoose.model("SalesProduct", SalesProductSchema)