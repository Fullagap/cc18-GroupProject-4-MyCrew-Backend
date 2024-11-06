const calendarService = require("../service/calendar-service")
const calendarController = {}

calendarController.getCalendar = async (req,res,next)=>{
    try{
        const data = await calendarService.getCalendar()
        res.json({ message: "Success", data })
    }catch(err){
        next(err)
    }
}

calendarController.getLeaveRecord = async (req,res,next)=>{
    try{
        const data = await calendarService.getLeaveRecord()
        res.json({ message: "Success LeaveRecord ", data })
    }catch(err){
        next(err)
    }
}

calendarController.getLeaveRecordById = async (req,res,next)=>{
    try{
        const { userId } = req.params;
        const data = await calendarService.getLeaveRecordById(userId)
        res.json({ message: "Success", data })
    }catch(err){
        next(err)
    }
}     

calendarController.getSession = async (req,res,next)=>{
    try{
        const data = await calendarService.getSession()
        res.json({ message: "Success getSession", data })
    }catch(err){
        next(err)
    }
}

calendarController.addSession = async (req,res,next)=>{
    try{
        const {createUserId, startedDate,endDate,description,eventType,attendanceLimit} = req.body
        console.log("addSession",req.body)
        await calendarService.addSession(createUserId, startedDate,endDate,description,eventType,attendanceLimit)
        res.json({ message: "Add Session Success" })
    }catch(err){
        next(err)
    }
}

calendarController.updateSession = async (req, res, next) => {
    try {
    //   const createUserId = req.user?.id; // ใช้ req.user.id ถ้ามีการยืนยันตัวตน
      const { sessionId } = req.params;
      const { createUserId,startedDate,endDate,description,eventType,attendanceLimit } = req.body;
  
      await calendarService.updateSession(sessionId,createUserId,startedDate,endDate,description,eventType,attendanceLimit);
        res.json({ message: "Update Session Success" })
    }catch(err){
        next(err)
    }
}

calendarController.deleteSession = async (req,res,next)=>{
    try{
        const { sessionId } = req.params
        await calendarService.deleteSession(sessionId)
        res.json({ message: "Delete Session Success"})
    }catch(err){
        next(err)
    }
}



module.exports = calendarController