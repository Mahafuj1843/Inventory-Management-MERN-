import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        trim: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{timestamps: true}
);

export default mongoose.model("Brand", BrandSchema)