const { Prisma } = require("@prisma/client")
const prisma = require("../config/prisma")

exports.getPublicHolidayByMonthly= async(month,year)=>{
    try {
        const resp = await prisma.publicHoliday.findMany({where : {month:month,year:year}, select: {id:true, dateTime:true, description : true}})
        return resp
    } catch (error) {
        console.log(error)     
    }
}