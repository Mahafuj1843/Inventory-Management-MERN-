import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
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

export default mongoose.model("Category", CategorySchema)