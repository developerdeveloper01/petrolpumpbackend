const express = require("express");
const router = express.Router();
const {
  addcreditcustomer,
  allcreditcustomer,
  getonecreditcustomer,
  deletecreditcustomer,
  updateonecreditcustomer,
} = require("../controllers/creditcustomers");

//PATHS
router.post("/dealer/addcreditcustomer", addcreditcustomer);
router.get("/dealer/allcreditcustomer", allcreditcustomer);
router.get("/dealer/getonecreditcustomer/:id", getonecreditcustomer);
router.get("/dealer/deletecreditcustomer/:id", deletecreditcustomer);
router.get("/dealer/updateonecreditcustomer/:id", updateonecreditcustomer);

module.exports = router;
