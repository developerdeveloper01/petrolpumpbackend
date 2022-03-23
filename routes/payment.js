const express = require("express");
const router = express.Router();
const {
    addpayment,
     allpayment,
    getonepayment,
    deletepayment,
   updateonepayment,
   addmode,
   allmode
  } = require("../controllers/payment");
 router.post("/dealer/addpayment",addpayment);
router.get("/dealer/allpayment", allpayment);
router.get("/dealer/getonepayment/:id", getonepayment);
router.get("/dealer/deletepayment/:id", deletepayment);
router.post("/dealer/updateonepayment/:id",updateonepayment);
router.get("/dealer/allmode", allmode);
router.post("/dealer/addmode",addmode);

module.exports = router;