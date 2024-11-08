const express = require("express");
const upload = require("../middlewares/upload")
const router = express.Router();
const { registerValidator } = require("../middlewares/validator");
const {
  register,
  updateUser,
  getUserById,
  getDepartment,
  getPositionEachDepartment,
  getEmployeeInDepartment,
  getEachSuperId,
  getLeaderEachSupId,
  getSupIdByDepartment,
  allEmployees,
  createDepartment,
  createPosition,
  getHeader,
  getLeadSupId,
  updateImageProfile,
  
} = require("../controllers/admin-controller");

const { authCheck, adminCheck } = require("../middlewares/authen");


router.patch("/admin/update-user/:id",authCheck,adminCheck,updateUser)
router.post("/admin/register",authCheck,adminCheck,registerValidator,register)
router.get("/admin/user/:id", authCheck, adminCheck, getUserById)
router.get("/admin/department",authCheck,adminCheck,getDepartment)
router.get("/admin/All-employees",authCheck,adminCheck,allEmployees)
router.get("/admin/department-position/:id",authCheck,adminCheck,getPositionEachDepartment)
router.get("/admin/department-employees/:id",authCheck,adminCheck,getEmployeeInDepartment)
router.get("/admin/superId-employees/:id", authCheck, adminCheck, getEachSuperId)
router.get("/admin/leader-superId/:id", authCheck, adminCheck, getLeaderEachSupId)
router.get("/admin/superId-department/:id", authCheck, adminCheck, getSupIdByDepartment)
router.post("/admin/create-department", createDepartment)
router.post("/admin/create-position", createPosition)
router.get("/admin/leader", getHeader)
router.get("/admin/supId",authCheck,getLeadSupId)
router.patch("/admin/update-profile",authCheck,upload.single("file"),updateImageProfile)

module.exports = router;
