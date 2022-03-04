const express = require("express");
const router = express.Router();
const {
    addbm,
    allbm,
  getonebm,
    deletebm,
    updatebm,
  } = require("../controllers/baymanagement");
 router.post("/dealer/addbm",addbm);
router.get("/dealer/allbm", allbm);
router.get("/dealer/getonebm/:id", getonebm);

router.post("/dealer/updatebm/:id", updatebm);

router.get("/dealer/deletebm/:id", deletebm);

module.exports = router;