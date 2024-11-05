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
  createUserId,
  attendanceLimit,
  eventType,
  targetDate,
  description
) => {
  console.log('prisma', createUserId,
    attendanceLimit,
    eventType,
    targetDate,
    description)
  return await prisma.session.create({
    data: {
      createUserId: parseInt(createUserId),
      attendanceLimit: parseInt(attendanceLimit),
      eventType,
      targetDate: new Date(targetDate),
      description,
    },
  });
};

calendarService.updateSession = async (
  sessionId,       
  createUserId,
  eventType,
  targetDate,
  description,
  attendanceLimit
) =>
  await prisma.session.update({
    where: {
      id: parseInt(sessionId)
    },
    data: {
      createUserId: parseInt(createUserId),
      eventType,
      targetDate: new Date(targetDate),
      description,
      attendanceLimit: parseInt(attendanceLimit),
    },
  });

calendarService.deleteSession = async (sessionId) =>
  await prisma.session.delete({
    where: {
      id: parseInt(sessionId),
    },
  });

module.exports = calendarService;
