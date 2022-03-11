const express = require("express");
const router = express.Router();
const {
    addbankDeposits,
    allbankDeposits,
    getonebankDeposits,
    deletebankDeposits,
    updateonebankDeposits,
} = require("../controllers/bankDeposits");

//PATHS

//PATHS
router.post("/dealer/addbankDeposits", addbankDeposits);
router.get("/dealer/allbankDeposits", allbankDeposits);
router.get("/dealer/getonebankDeposits/:id", getonebankDeposits);
router.get("/dealer/deletebankDeposits/:id", deletebankDeposits);
router.post("/dealer/updateonebankDeposits/:id", updateonebankDeposits);

module.exports = router;
