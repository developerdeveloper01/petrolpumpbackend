const express = require("express");
const router = express.Router();
const {
  addbank,
  allbank,
  getonebank,
  deletebank,
  updateonebank,
} = require("../controllers/bank");

//PATHS
router.post("/dealer/addbank", addbank);
router.get("/dealer/allbank", allbank);
router.get("/dealer/getonebank/:Id", getonebank);
router.get("/dealer/deletebank/:Id", deletebank);
router.get("/dealer/updateonebank/:Id", updateonebank);

module.exports = router;
