import mongoose from "mongoose";

export const parentChildCreateService = async (Req, PModel, CModel, JoinProperty) =>{

        // Create Transaction Session
        const session = await mongoose.startSession()
    try {
        // Start Transaction
        await session.startTransaction()

        let parent = Req.body.parent
        parent.userId = Req.user.id
        let createParent = await PModel.create([parent], {session})

                let childs = Req.body.childs
                await childs.map((e)=>{
                    e[JoinProperty] = createParent[0]._id
                    e.total = e.qty * e.price
                    e.userId = Req.user.id
                })
                let createChild = await CModel.insertMany(childs, {session})

                if(createChild){
                    // Transaction Success and end
                    await session.commitTransaction()
                    session.endSession()

                    return { status: 'success', Parent: createParent, Childs: createChild}
                }
    } catch (error) {
        //Rollback trancation if catch any error
        await session.abortTransaction()
        session.endSession()
        return { status: "fail", data: error.toString()}
    }
}

export const parentChildDeleteService = async (Req, PModel, CModel, JoinProperty) =>{
    const session = await mongoose.startSession()

    try {
        await session.startTransaction()

        let deleteId = Req.params.id
        let userId = Req.user.id

        let parentObject = {}
        parentObject._id = deleteId
        parentObject.userId = userId

        let childObject = {}
        childObject[JoinProperty] = deleteId
        childObject.userId = userId

        let childsDelete = await CModel.deleteMany(childObject).session(session)
        let parentDelete = await PModel.deleteOne(parentObject).session(session)

        await session.commitTransaction();
        session.endSession();

        return { status: 'success', Parent: parentDelete, Child: childsDelete }
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        return { status: "fail", data: error.toString()}
    }
}