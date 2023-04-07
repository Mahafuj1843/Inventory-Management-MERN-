import mongoose from "mongoose";

export const detailsByIDService= async (Req, Model) => {
    try{
	let queryObj = {
              _id: mongoose.Types.ObjectId(Req.params.id),
              userId: mongoose.Types.ObjectId(Req.user.id)
	}
        let data = await Model.aggregate([
            {$match:  queryObj}
        ])
        // console.log(data)
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}