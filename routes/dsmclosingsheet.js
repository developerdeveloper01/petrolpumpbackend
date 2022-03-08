const express = require("express");
const router = express.Router();
const {
    adddsmclosing,
    alldsmclosing,
    getonedsmclosing,
    deletedsmclosing,
    updatedsmclosing,
  } = require("../controllers/dsmclosingsheet");
 router.post("/dealer/adddsmclosing",adddsmclosing);
router.get("/dealer/alldsmclosing", alldsmclosing);
router.get("/dealer/getonedsmclosing/:id", getonedsmclosing);

router.get("/dealer/deletedsmclosing/:id", deletedsmclosing);

router.post("/dealer/updatedsmclosing/:id", updatedsmclosing);

module.exports = router;