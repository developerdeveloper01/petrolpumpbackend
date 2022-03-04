const express = require("express");
const router = express.Router();
const {
    addrsp,
    allrsp,
//     getonepayment,
//     deletepayment,
//    updateonepayment,
  } = require("../controllers/rsp");
 router.post("/dealer/addrsp",addrsp);
router.get("/dealer/allrsp", allrsp);
module.exports = router;