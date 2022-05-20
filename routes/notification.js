const express = require("express");
const router = express.Router();

const {
  addnotification,

  viewonenotification,
  allnotification,
  deletenotification,
} = require("../controllers/notification");

//Paths
router.post("/admin/addnotification", addnotification);

router.get("/admin/viewonenotification/:id", viewonenotification);
router.get("/admin/allnotification", allnotification);
router.get("/admin/deletenotification/:id", deletenotification);

module.exports = router;
