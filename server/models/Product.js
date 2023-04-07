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
    unit:{
        type: String,
        require: true
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
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
  },{timestamps: true}
  );

  export default mongoose.model("Product", ProductSchema)