const prisma = require("../config/prisma");
const calendarService = {};

calendarService.getCalendar = async () => 
  await prisma.calendar.findMany();

calendarService.getLeaveRecord = async () => 
  await prisma.leaveRecord.findMany();

calendarService.getLeaveRecordById = async (userId) => 
    await prisma.leaveRecord.findMany({
        where: { userId: parseInt(userId) },
        include: { leaveCategory: true }, // ดึงข้อมูล leaveCategory มาด้วย
      });


calendarService.getSessionById = async (createUserId) =>  /// หรือเอามาให้หมดเลย แล้วไปจัดการข้อมูลที่หน้าบ้านอีกที
  await prisma.session.findMany({
    where: { 
      createUserId
      },
  });

calendarService.addMemo = async (createUserId,attendanceLimit,eventType,targetDate,description) => {
  console.log('first', createUserId,attendanceLimit,eventType,targetDate,description)
   return await prisma.session.create({
        data: {
          createUserId,
          attendanceLimit,
          eventType,
          targetDate: new Date(targetDate),
          description,
        },
      });
    }

calendarService.updateMemo = async (createUserId,eventType,targetDate,description) => 
    await prisma.session.update({
        data: {
          id: sessionId,
          createUserId,
          eventType,
          targetDate: new Date(targetDate),
          description,
        },
      });

calendarService.deleteMemo = async (sessionId) => 
    await prisma.session.delete({
        where: {
            id: sessionId
        },
      });

module.exports = calendarService;
