import mongoose from "mongoose";

export const parentChildsById= async (Req, Model, JoinProperty, joinStage) => {
    try{
	let queryObj = {}
        queryObj[JoinProperty] = mongoose.Types.ObjectId(Req.params.id),
        queryObj.userId = mongoose.Types.ObjectId(Req.user.id)
        let data = await Model.aggregate([
            {$match:  queryObj},
	     joinStage
        ])
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}