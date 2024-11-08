const express = require("express")
const {checkRequest,changeStatus,changeComment,checkItem,
    createItem,updateItem,checkRequestItem,createRequestItem,
    changeStatusRequestItem,checkSup,checkUserRequestItem} = require("../controllers/checkRequest-controller")
const router = express.Router()


router.get("/checkRequest/:sup_id",checkRequest )
router.patch("/changeStatus/:id",changeStatus )
router.patch("/changeComment/:id",changeComment )

router.get("/checkItem",checkItem)
router.post("/createItem",createItem)
router.patch("/updateItem/:id",updateItem)

router.get("/checkRequestItem",checkRequestItem)
router.post("/createRequestItem",createRequestItem)
router.patch("/changeStatusRequestItem/:id",changeStatusRequestItem)
router.get("/checkItemSup/:sup_id",checkSup)
router.get("/checkUserRequestItem/:user_id",checkUserRequestItem)


module.exports = router