const calendarService = require("../service/calendar-service")
const calendarController = {}

calendarController.getCalendar = async (req,res,next)=>{
    try{
        const data = await calendarService.getCalendar()
        res.json({ message: "Success", data })
    }catch{
        next()
    }
}

calendarController.getLeaveRecord = async (req,res,next)=>{
    try{
        const data = await calendarService.getLeaveRecord()
        res.json({ message: "Success", data })
    }catch{
        next()
    }
}

calendarController.getLeaveRecordById = async (req,res,next)=>{
    try{
        const { userId } = req.params;
        const data = await calendarService.getLeaveRecordById(userId)
        res.json({ message: "Success", data })
    }catch{
        next()
    }
}     

calendarController.getSessionById = async (req,res,next)=>{
    try{
        // const createUserId = req.user.id // ต้องรอ Login
        const {createUserId} = req.params
        console.log('req.params getSessionById', req.params)
        const data = await calendarService.getSessionById(createUserId)
        res.json({ message: "Success getSessionById", data })
    }catch{
        next()
    }
}

calendarController.addMemo = async (req,res,next)=>{
    try{
        // const createUserId = req.user.id // ต้องลอง Log ดูอีกที
        const eventType = "MEMO"
        const attendanceLimit = 0
        const {createUserId} = req.params
        const { targetDate, description } = req.body
        console.log('req.params', req.params)
        console.log('req.body', req.body)
        await calendarService.addMemo(createUserId,attendanceLimit,eventType,targetDate,description)
        res.json({ message: "Success" })
    }catch{
        next()
    }
}

calendarController.updateMemo = async (req,res,next)=>{
    try{
        const createUserId = req.user.id // ต้องลอง Log ดูอีกที
        const eventType = "MEMO"
        const {sessionId} = req.params
        const { targetDate, description } = req.body
        await calendarService.updateMemo(createUserId,eventType,sessionId,targetDate,description)
        res.json({ message: "Success" })
    }catch{
        next()
    }
}

calendarController.deleteMemo = async (req,res,next)=>{
    try{
        const { sessionId } = req.params
        await calendarService.deleteMemo(sessionId)
        res.json({ message: "Delete Memo Success"})
    }catch{
        next()
    }
}

module.exports = calendarController