const express = require("express");
const router = express.Router();
const {
    addSalesfigures,
    allSalesfigures,
    viewoneSalesfigures,
  updateSalesfigures,
  deleteSalesfigures,
} = require("../controllers/salesfigures");
router.post("/dealer/addSalesfigures", addSalesfigures);
router.get("/dealer/allSalesfigures", allSalesfigures);
router.get("/dealer/viewoneSalesfigures/:id", viewoneSalesfigures);

router.post("/dealer/updateSalesfigures/:id", updateSalesfigures);

router.get("/dealer/deleteSalesfigures/:id", deleteSalesfigures);

module.exports = router;
