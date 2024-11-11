const express = require("express");
const router = express.Router();
const {  createOfficeSiteLocation,editOfficeSiteLocation,deleteOfficeSiteLocation} = require("../controllers/admin-location-controller");
const { authCheck, adminCheck } = require("../middlewares/authen");

router.post("/admin/site-register",authCheck,adminCheck,createOfficeSiteLocation);
router.post("/admin/site-edit",authCheck,adminCheck,editOfficeSiteLocation);
router.post("/admin/site-delete",authCheck,adminCheck,deleteOfficeSiteLocation);

module.exports = router;
