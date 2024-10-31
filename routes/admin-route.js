const express = require("express")
const router = express.Router()
module.exports = router
module.exports = router
const {register,updateUser,getUserById,getDepartment,getPositionEachDepartment,getEmployeeInDepartment,getEachSuperId} = require("../controllers/admin-controller")
const {authCheck,adminCheck} = require("../middlewares/authen")

router.post("/admin/register",register)
router.patch("/admin/update-user/:id",authCheck,adminCheck,updateUser)
router.get("/admin/user/:id",authCheck,adminCheck,getUserById)
router.get("/admin/department",authCheck,adminCheck,getDepartment)
router.get("/admin/department-position/:id",authCheck,adminCheck,getPositionEachDepartment)
router.get("/admin/department-employees/:id",authCheck,adminCheck,getEmployeeInDepartment)
router.get("/admin/superId-employees/:id",authCheck,adminCheck,getEachSuperId)

module.exports = router