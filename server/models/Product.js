import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    desc:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    brandId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Brand",
    },
    quantity:{
        type: Number,
        required: true
    },
    sold:{
        type: Number,
        default: 0
    },
    image:{
        type: String
    },
    unit:{
        type: String,
        require: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
  },{timestamps: true}
  );

  export default mongoose.model("Product", ProductSchema)