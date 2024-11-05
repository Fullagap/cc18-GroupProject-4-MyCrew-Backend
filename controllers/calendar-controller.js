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
        res.json({ message: "Success LeaveRecord ", data })
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

calendarController.getSession = async (req,res,next)=>{
    try{
        const data = await calendarService.getSession()
        res.json({ message: "Success getSession", data })
    }catch{
        next()
    }
}

calendarController.addSession = async (req,res,next)=>{
    try{
        // const createUserId = req.user.id // ต้องลอง Log ดูอีกที
        // const attendanceLimit = 0
        const {createUserId, targetDate, description,eventType,attendanceLimit } = req.body
        console.log('req.body addSession', req.body)
        await calendarService.addSession(createUserId,attendanceLimit,eventType,targetDate,description)
        res.json({ message: "Add Session Success" })
    }catch{
        next()
    }
}

calendarController.updateSession = async (req, res, next) => {
    try {
    //   const createUserId = req.user?.id; // ใช้ req.user.id ถ้ามีการยืนยันตัวตน
      const { sessionId } = req.params;
      const attendanceLimit = 0;
      const { createUserId, targetDate, description, eventType } = req.body;
  
      await calendarService.updateSession(
        sessionId,  
        createUserId,
        eventType,
        targetDate,
        description,
        attendanceLimit
      );
        res.json({ message: "Update Session Success" })
    }catch{
        next()
    }
}

calendarController.deleteSession = async (req,res,next)=>{
    try{
        const { sessionId } = req.params
        await calendarService.deleteSession(sessionId)
        res.json({ message: "Delete Session Success"})
    }catch{
        next()
    }
}

module.exports = calendarController