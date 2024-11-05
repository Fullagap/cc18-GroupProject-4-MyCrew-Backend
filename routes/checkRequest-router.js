const express = require("express")
const {checkRequest,changeStatus,changeComment} = require("../controllers/checkRequest-controller")
const router = express.Router()


router.get("/checkRequest/:sup_id",checkRequest )
router.patch("/changeStatus/:id",changeStatus )
router.patch("/changeComment/:id",changeComment )

module.exports = router