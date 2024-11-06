const prisma = require("../config/prisma");
const calendarService = {};

calendarService.getCalendar = async () => await prisma.calendar.findMany();

calendarService.getLeaveRecord = async () =>
  await prisma.leaveRecord.findMany();

calendarService.getLeaveRecordById = async (userId) =>
  await prisma.leaveRecord.findMany({
    where: { userId: parseInt(userId) },
    include: { leaveCategory: true }, // ดึงข้อมูล leaveCategory มาด้วย
  });

calendarService.getSession = async () =>
  await prisma.session.findMany();

calendarService.addSession = async (
  createUserId, startedDate,endDate,description,eventType,attendanceLimit
) => 
  await prisma.session.create({
    data: {
      createUserId: parseInt(createUserId),
      startedDate: new Date(startedDate),
      endDate: new Date(endDate),
      description,
      eventType,
      attendanceLimit: !isNaN(attendanceLimit) ? parseInt(attendanceLimit) : null,
    },
  });


calendarService.updateSession = async (sessionId,createUserId,startedDate,endDate,description,eventType,attendanceLimit) =>
  await prisma.session.update({
    where: {
      id: parseInt(sessionId)
    },
    data: {
      createUserId: parseInt(createUserId),
      startedDate: new Date(startedDate),
      endDate: new Date(endDate),
      description,
      eventType,
      attendanceLimit: !isNaN(attendanceLimit) ? parseInt(attendanceLimit) : null,
    },
  });

calendarService.deleteSession = async (sessionId) =>
  await prisma.session.delete({
    where: {
      id: parseInt(sessionId),
    },
  });

module.exports = calendarService;
