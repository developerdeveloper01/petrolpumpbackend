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
router.get("/dealer/getonepayment/:id", getonepayment);
router.get("/dealer/deletepayment/:id", deletepayment);
router.post("/dealer/updateonepayment/:id",updateonepayment);

module.exports = router;