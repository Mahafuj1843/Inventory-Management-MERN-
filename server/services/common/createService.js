import mongoose from "mongoose";

export const createService = async (Req, Model) =>{
    try {
        let postBody = Req.body
        postBody.userId = Req.user.id;
        let data = await Model.create(postBody)
        return { status: "success", data: data}
    } catch (error) {
        return { status: "fail", data: error.toString()}
    }
}

export const updateService = async (Req, Model) =>{
    try {
        let data = await Model.updateOne({_id: Req.params.id, userId: Req.user.id}, Req.body)
        return { status: "success", data: data}
    } catch (error) {
        return { status: "fail", data: error.toString()}
    }
}

export const deleteService = async (Req, Model) =>{
    try {
        let data = await Model.deleteMany({_id: Req.params.id, userId: Req.user.id})
        return { status: "success", data: data}
    } catch (error) {
        return { status: "fail", data: error.toString()}
    }
}

export const listService = async (Req, Model, SearchArray) =>{
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

export const dropDownService = async (Req, Model, Projection) =>{
    try {
        let data = await Model.aggregate([
            {$match: {userId: mongoose.Types.ObjectId(Req.user.id)}},
            {$project: Projection}
        ])
        return { status: "success", data: data}
    } catch (error) {
        return { status: "fail", data: error.toString()}
    }
}