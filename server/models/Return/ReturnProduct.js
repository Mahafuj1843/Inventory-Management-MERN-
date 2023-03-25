import mongoose from "mongoose";

const ReturnProductSchema = new mongoose.Schema({
    returnId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Return"
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

export default mongoose.model("ReturnProduct", ReturnProductSchema)