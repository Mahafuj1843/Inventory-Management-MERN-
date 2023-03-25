import mongoose from "mongoose";

export const detailsByIDService= async (Req, Model) => {
    try{
        let data = await Model.aggregate([
            {$match: {_id: mongoose.Types.ObjectId(Req.params.id), userId: Req.user.id}}
        ])
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error}
    }
}