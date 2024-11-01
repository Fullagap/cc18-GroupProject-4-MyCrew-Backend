const express = require("express")
const router = express.Router()
const {register,updateUser,getUserById,getDepartment,getPositionEachDepartment,getEmployeeInDepartment,getEachSuperId,getLeaderEachSupId,getSupIdByDepartment}= require("../controllers/admin-controller")
const {authCheck,adminCheck} = require("../middlewares/authen")

router.post("/admin/register",register)
router.patch("/admin/update-user/:id",authCheck,adminCheck,updateUser)
router.get("/admin/user/:id",authCheck,adminCheck,getUserById)
router.get("/admin/department",getDepartment)
router.get("/admin/department-position/:id",getPositionEachDepartment)
router.get("/admin/department-employees/:id",getEmployeeInDepartment)
router.get("/admin/superId-employees/:id",authCheck,adminCheck,getEachSuperId)
router.get("/admin/leader-superId/:id",authCheck,adminCheck,getLeaderEachSupId)
router.get("/admin/superId-department/:id",authCheck,adminCheck,getSupIdByDepartment)

module.exports = router