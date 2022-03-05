const express = require("express");
const router = express.Router();
const {
    addc_bm,
    allc_bm,
    getonec_bm,
  deletec_bm,
  updatec_bm,
  } = require("../controllers/closing_bm");
 router.post("/dealer/addc_bm",addc_bm);
router.get("/dealer/allc_bm", allc_bm);
router.get("/dealer/getonec_bm/:id", getonec_bm);

router.post("/dealer/updatebm/:id", updatec_bm);

router.get("/dealer/deletec_bm/:id", deletec_bm);

module.exports = router;