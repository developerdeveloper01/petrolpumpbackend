const express = require("express");
const router = express.Router();
const {
    addFuelstock,
    allFuelstock,
    viewoneFuelstock,
    updateFuelstock,
    deleteFuelstock,
} = require("../controllers/fuel_stock_management");
router.post("/dealer/addFuelstock", addFuelstock);
router.get("/dealer/allFuelstock", allFuelstock);
router.get("/dealer/viewoneFuelstock/:id", viewoneFuelstock);

router.post("/dealer/updateFuelstock/:id", updateFuelstock);

router.get("/dealer/deleteFuelstock/:id", deleteFuelstock);

module.exports = router;
