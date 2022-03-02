const express = require("express");
const router = express.Router();
const {
    addpayment,
     allpayment,
    getonepayment,
    deletepayment,
   updateonepayment,
  } = require("../controllers/payment");
 router.post("/dealer/addpayment",addpayment);
router.get("/dealer/allpayment", allpayment);
router.get("/dealer/getonepayment/:Id", getonepayment);
//router.get("/dealer/deletepayment/:Id", deletepayment);
router.post("/dealer/updateonepayment/:Id", updateonepayment);

module.exports = router;