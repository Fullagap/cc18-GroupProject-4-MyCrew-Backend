const createError = require("../utils/createError")
const prisma = require("../config/prisma");

exports.getSiteLocationData = async (req,res,next) =>{
    try{
        const siteLocation = await prisma.site.findMany()
        res.status(201).json(siteLocation)

    }catch(err){
        next(err)
    }
}