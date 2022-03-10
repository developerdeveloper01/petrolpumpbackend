const express = require("express");
const router = express.Router();
const {
  addcreditmanagement,
  allcreditmanagement,
    getonecreditmanagement,
    deletecreditmanagement,
    updatecreditmanagement,
  } = require("../controllers/creditmanagement");


 router .post("/dealer/addcreditmanagement", addcreditmanagement);
 router .get("/dealer/allcreditmanagement", allcreditmanagement);

router.post("/dealer/updatecreditmanagement/:id", updatecreditmanagement);

router.get("/dealer/getonecreditmanagement/:id", getonecreditmanagement);

router.get("/dealer/deletecreditmanagement/:id", deletecreditmanagement);

module.exports = router;