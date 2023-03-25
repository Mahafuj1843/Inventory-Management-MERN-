import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        unique: true
    },
    phone:{
        type:String,
        unique:true,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{timestamps: true}
);

export default mongoose.model("Customer", CustomerSchema)