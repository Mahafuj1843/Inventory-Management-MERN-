import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    typeId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    total:{
        type: Number,
        require: true
    },
    note:{
        type: String
    }
},{timestamps: true}
);

export default mongoose.model("Expense", ExpenseSchema)