const express = require("express");
const router = express.Router();

const {
  getbaymap,
  gettankmap
} = require("../controllers/dealercommon");

//Paths
router.get("/dealer/getbay/:dealerid", getbaymap);
router.get("/dealer/gettankmap/:dealerid", gettankmap);

module.exports = router;

