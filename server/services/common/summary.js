import mongoose from "mongoose"

export const summaryService= async (Req, Model) => {
    try{
        let data=await  Model.aggregate([
            {$match: {userId: mongoose.Types.ObjectId(Req.user.id)}},
            {
                $facet:{
                    Total:[{
                        $group:{
                            _id:0,
                            TotalAmount:{$sum:"$total"}
                        }
                    }],
                    Last30Days:[{
                        $group:{
                            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }},
                            TotalAmount:{$sum:"$total"}
                        }},
                        { $sort: { _id: -1 } },
                        { $limit: 30 }
                    ]
                }
            }
        ])
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}