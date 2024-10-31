const express = require("express");
const calendarController = require("../controllers/calendar-controller");
const router = express.Router()

router.get("/calendar", calendarController.getCalendar); // แสดงข้อมูลปฏิทินทั้งหมด แค่Calendar
router.get("/calendar/leaveRecord", calendarController.getLeaveRecord); // แสดงแค่ขาดลามาสายอย่างเดียว ไม่เกี่ยวกับปฏิทิน ค่อยเอามา Map ใส่ทีหลัง
router.get("/calendar/leave-history/:userId", calendarController.getLeaveHistory); // ดูประวัติการหยุดงาน

router.get("/calendar/memo/:date", calendarController.getMemosByDate); // ดู memo ในวันที่เลือก
router.post("/calendar/memo", calendarController.addMemo); // เพิ่ม memo 
router.delete("/calendar/deleteMemo/:memoId", calendarController.deleteMemo); // ลบ memo 

module.exports = router 