const express = require("express");
const router = express.Router();
const {
  addcreditcustomer,
  getoutlet,
  getoneoutlet,
  deleteoutlet,
  updateoneoutlet,
} = require("../controllers/creditcustomer");

//PATHS
router.post("/dealer/addcreditcustomer", addcreditcustomer);
//router.get("/dealer/getoutlet", getoutlet);
//router.get("/dealer/getoneoutlet", getoneoutlet);
//router.get("/dealer/deleteoutlet", deleteoutlet);
//router.get("/dealer/updateoneoutlet", updateoneoutlet);

module.exports = router;
