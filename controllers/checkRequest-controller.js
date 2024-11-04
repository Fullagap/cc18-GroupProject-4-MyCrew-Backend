const prisma = require("../config/prisma")
const createError = require("../utils/createError")

exports.checkRequest = async (req,res,next) => {
    try {
        const {sup_id} = req.params
        const user = await prisma.LeaveRecord.findMany({
            where: {
                supId: Number(sup_id)
            },
            include: {
                user: true,
                leaveCategory: true
            }
        })
        if(user.length === 0){
            return createError(400,"User not found")
        }
        console.log(user)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

exports.changeStatus = async (req,res,next) => {
    try {
        const {id} = req.params
        const {status} = req.body
        console.log(id , status)
        const user = await prisma.LeaveRecord.update({
            where: {
                id: Number(id)
            },
            data: {
                status
            }
        })
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

exports.changeComment = async (req,res,next) => {
    try {
        const {id} = req.params
        const {comment} = req.body
        console.log(id , comment)
        const user = await prisma.LeaveRecord.update({
            where: {
                id: Number(id)
            },
            data: {
                comment
            }
        })
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}