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

calendarController.getLeaveHistory = async (req,res,next)=>{
    try{
        const { userId } = req.params;
        const data = await calendarService.getLeaveHistory(userId)
        res.json({ message: "Success", data })
    }catch{
        next()
    }
}     

calendarController.getMemosByDate = async (req,res,next)=>{
    try{
        const userId = req.user.id // ต้องลอง Log ดูอีกที
        const {date} = req.params
        const data = await calendarService.getMemosByDate(userId,date)
        res.json({ message: "Success", data })
    }catch{
        next()
    }
}

calendarController.addMemo = async (req,res,next)=>{
    try{
        const userId = req.user.id // ต้องลอง Log ดูอีกที
        const { date, content } = req.body
        await calendarService.addMemo(userId,date,content)
        res.json({ message: "Success" })
    }catch{
        next()
    }
}

calendarController.deleteMemo = async (req,res,next)=>{
    try{
        const { memoId } = req.params
        await calendarService.deleteMemo(memoId)
        res.json({ message: "Delete Memo Success"})
    }catch{
        next()
    }
}

module.exports = calendarController