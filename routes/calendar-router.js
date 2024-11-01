const express = require("express");
const calendarController = require("../controllers/calendar-controller");
const router = express.Router()

router.get("/calendar", calendarController.getCalendar); // แสดงข้อมูลปฏิทินทั้งหมด แค่Calendar
router.get("/calendar/leaveRecord", calendarController.getLeaveRecord); // แสดงแค่ขาดลามาสายอย่างเดียว ไม่เกี่ยวกับปฏิทิน ค่อยเอามา Map ใส่ทีหลัง
router.get("/calendar/leaveRecord/:userId", calendarController.getLeaveRecordById); // ดูประวัติการหยุดงาน

router.get("/calendar/session/:userId", calendarController.getSessionById); // ดู session ทั้งหมด

router.post("/calendar/memo/addMemo/:createUserId", calendarController.addMemo); // เพิ่ม memo 
router.post("/calendar/memo/updateMemo/:memoId", calendarController.updateMemo); // เพิ่ม memo 
router.delete("/calendar/deleteMemo/:memoId", calendarController.deleteMemo); // ลบ memo 

// router.get("/calendar/memo/:date", calendarController.getHoliday);   // ดู memo ในวันที่เลือก
// router.post("/calendar/memo", calendarController.addHoliday);        // เพิ่ม memo 
// router.delete("/calendar/deleteMemo/:memoId", calendarController.deleteHoliday); // ลบ memo 

module.exports = router 