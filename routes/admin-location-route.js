const express = require("express");
const router = express.Router();
const {  createOfficeSiteLocation} = require("../controllers/admin-location-controller");
const { authCheck, adminCheck } = require("../middlewares/authen");

router.post("/admin/site-register",createOfficeSiteLocation);

module.exports = router;
