const express = require("express");
const router = express.Router();

const {
  addabout,

  viewoneabout,
  allabout,
  deleteabout,
} = require("../controllers/about");

//Paths
router.post("/admin/addabout", addabout);

router.get("/admin/viewoneabout/:id", viewoneabout);
router.get("/admin/allabout", allabout);
router.get("/admin/deleteabout/:id", deleteabout);

module.exports = router;
