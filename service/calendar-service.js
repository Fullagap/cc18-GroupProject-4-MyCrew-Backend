const prisma = require("../config/prisma");
const calendarService = {};

calendarService.getCalendar = async () => await prisma.calendar.findMany();

calendarService.getLeaveRecord = async () =>
  await prisma.leaveRecord.findMany();

calendarService.addLeaveRequest = async (
  userId,
  requestDate,
  startDate,
  endDate,
  leaveTypeId,
  supId,
  status,
  description
) =>
  await prisma.leaveRecord.create({
    data: {
      userId: parseInt(userId),
      requestDate: new Date(requestDate),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      leaveTypeId: parseInt(leaveTypeId),
      supId: parseInt(supId),
      status,
      description,
      // leaveCategoryId: parseInt(leaveTypeId)
    },
  });

calendarService.getLeaveRecordById = async (userId) =>
  await prisma.leaveRecord.findMany({
    where: { userId: parseInt(userId) },
    include: { leaveCategory: true }, // ดึงข้อมูล leaveCategory มาด้วย
  });

calendarService.getSession = async () => await prisma.session.findMany();

calendarService.getHoliday = async () =>
  await prisma.session.findMany({
    where: {
      eventType: "HOLIDAY",
    },
    select: {
      id: true,
      startedDate: true,
      description: true,
    },
  });

calendarService.addSession = async (
  createUserId,
  startedDate,
  endDate,
  description,
  eventType,
  attendanceLimit
) =>
  await prisma.session.create({
    data: {
      createUserId: parseInt(createUserId),
      startedDate: new Date(startedDate),
      endDate: new Date(endDate),
      description,
      eventType,
      attendanceLimit: !isNaN(attendanceLimit)
        ? parseInt(attendanceLimit)
        : null,
    },
  });

calendarService.updateSession = async (
  sessionId,
  createUserId,
  startedDate,
  endDate,
  description,
  // eventType,
  attendanceLimit
) =>
  await prisma.session.update({
    where: {
      id: parseInt(sessionId),
    },
    data: {
      createUserId: parseInt(createUserId),
      startedDate: new Date(startedDate),
      endDate: new Date(endDate),
      description,
      // eventType,
      attendanceLimit: !isNaN(attendanceLimit)
        ? parseInt(attendanceLimit)
        : null,
    },
  });

calendarService.deleteSession = async (sessionId) =>
  await prisma.session.delete({
    where: {
      id: parseInt(sessionId),
    },
  });

calendarService.getMissingAttendance = async (userId) =>
  await prisma.attendance.findMany({
    where: {
      userId: parseInt(userId), // กำหนด User ที่ต้องการหา
      checkInTime: { not: { gte: new Date("1900-01-01T00:00:00.000Z") } }, // เช็คว่าไม่มีการเช็คอิน
      isWorkingDay: true, // เช็คว่าเป็นวันทำงาน
    },
    select: {
      date: true, // หาวันที่ขาดงาน
      day: true, // วันในสัปดาห์
    },
  });

calendarService.publicHoliday = async (arrData) => {
  try {
    await prisma.publicHoliday.create({
      data: arrData,
    });
    console.log("Public holiday created successfully!");
  } catch (error) {
    console.error("Error creating public holiday:", error);
  }
};

calendarService.editPublicHoliday = async (publicHolidayId,description,date, month, year, dateTime) => {
  try {
    await prisma.publicHoliday.update({
      where: {
        id: parseInt(publicHolidayId),
      },
      data: {
        description,date, month, year, dateTime
      },
    });
    console.log("Public holiday Edit successfully!");
  } catch (error) {
    console.error("Error Edit public holiday:", error);
  }
};

module.exports = calendarService;
