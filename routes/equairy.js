const express = require("express");
const router = express.Router();

const {
  addequairy,

  viewoneequairy,
  allequairy,
  deleteequairy,
  allequairyApp,
} = require("../controllers/equairy");

//Paths
router.post("/admin/addequairy", addequairy);

router.get("/admin/viewoneequairy/:id", viewoneequairy);
router.get("/admin/allequairyApp/:dealer_Id", allequairyApp);
router.get("/admin/allequairy", allequairy);
router.get("/admin/deleteequairy/:id", deleteequairy);

module.exports = router;
