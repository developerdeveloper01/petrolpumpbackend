const express = require("express");
const router = express.Router();

const {
  getbaymap,
} = require("../controllers/dealercommon");

//Paths
router.get("/dealer/getbay/:dealerid", getbaymap);

module.exports = router;

