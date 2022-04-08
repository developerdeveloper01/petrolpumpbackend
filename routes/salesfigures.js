const express = require("express");
const router = express.Router();
const {
    addSalesfigures,
  allrsp,
  getonersp,
  updatersp,
  deletersp,
} = require("../controllers/salesfigures");
router.post("/dealer/addSalesfigures", addSalesfigures);
// router.get("/dealer/allrsp", allrsp);
// router.get("/dealer/getonersp/:id", getonersp);

// router.post("/dealer/updatersp/:id", updatersp);

// router.get("/dealer/deletersp/:id", deletersp);

module.exports = router;
