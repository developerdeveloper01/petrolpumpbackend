const express = require("express");
const router = express.Router();
const {
  addoutlet,
  getoutlet,
  getoneoutlet,
  deleteoutlet,
  updateoneoutlet,
} = require("../controllers/designoutlet");

//PATHS
router.post("/dealer/addoutlet", addoutlet);
router.get("/dealer/getoutlet", getoutlet);
router.get("/dealer/getoneoutlet", getoneoutlet);
router.get("/dealer/deleteoutlet", deleteoutlet);
router.get("/dealer/updateoneoutlet", updateoneoutlet);

module.exports = router;
