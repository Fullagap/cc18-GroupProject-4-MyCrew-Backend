const prisma = require("../config/prisma");
const calendarService = {};

calendarService.getCalendar = async () => {
  await prisma.calendar.findMany();

};

calendarService.getLeaveRecord = async () => {
  await prisma.leaveRecord.findMany();

};

calendarService.getLeaveHistory = async (userId) => {
    await prisma.leaveRecord.findMany({
        where: { userId: parseInt(userId) },
        include: { leaveCategory: true }, // ดึงข้อมูล leaveCategory มาด้วย
      });
};

calendarService.getMemosByDate = async (userId,date) => { /// หรือเอามาให้หมดเลย แล้วไปจัดการข้อมูลที่หน้าบ้านอีกที
  await prisma.memo.findMany({
    where: { 
        userId,
        date: new Date(date) },
  });
};

calendarService.addMemo = async (userId,date,content) => {
    await prisma.memo.create({
        data: {
          userId,
          date: new Date(date),
          content,
        },
      });
};

calendarService.deleteMemo = async (memoId) => {
    await prisma.memo.create({
        where: {
            id: memoId
        },
      });
};

module.exports = calendarService;
