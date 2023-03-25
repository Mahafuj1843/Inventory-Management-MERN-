import mongoose from "mongoose";

export const oneJoinlistService = async (Req, Model, SearchArray, joinStage) =>{
    try {
        let pageNo = Number(Req.params.pageNo);
        let perPage = Number(Req.params.perPage);
        let searchValue = Req.params.searchKey;
        const skipRow = (pageNo - 1) * perPage;
        let data;
        if (searchValue!=="0") {
            // let SearchRgx = {"$regex": searchValue, "$options": "i"}
            let SearchQuery = {$or: SearchArray}
            data = await Model.aggregate([
                {$match: {userId: mongoose.Types.ObjectId(Req.user.id)}},
                joinStage,
                {
                    $facet:{
                        Total: [{$match: SearchQuery}, {$count: 'total'}],
                        Row: [{$match: SearchQuery}, {$skip: skipRow}, {$limit: perPage}]
                    }
                }
            ])
        } else {
            data = await Model.aggregate([
                {$match: {userId: mongoose.Types.ObjectId(Req.user.id)}},
                joinStage,
                {
                    $facet:{
                        Total: [{$count: 'total'}],
                        Row: [{$skip: skipRow}, {$limit: perPage}]
                    }
                }
            ])
        }
        return { status: "success", data: data}
    } catch (error) {
        return { status: "fail", data: error.toString()}
    }
}