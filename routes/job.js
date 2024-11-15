const express = require("express");
const jobController = require("../controllers/job-controller");
const router = express.Router()

router.get("/job/Project", jobController.getProject); 
router.post("/job/ProjectCreate", jobController.projectCreate); 
router.patch("/job/ProjectUpdate/:projectId", jobController.projectUpdate); 
router.delete("/job/ProjectDelete/:projectId", jobController.projectDelete); 

module.exports = router 