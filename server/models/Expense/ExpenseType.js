import mongoose from "mongoose";

const ExpenseTypeSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},{timestamps: true}
);

export default mongoose.model("ExpenseType", ExpenseTypeSchema)