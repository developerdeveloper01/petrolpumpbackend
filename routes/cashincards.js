const express = require("express");
const router = express.Router();

const {
  addcashincards,
  allcashincardsApp,
  allcashincards,
  getonecashinbank,
  deletecashinbank,
  updatecashinbank,
} = require("../controllers/cashincards");

router.post("/dealer/addcashincards", addcashincards);

router.get("/dealer/allcashincards", allcashincards);
// router.get("/dealer/getonecashinbank/:id", getonecashinbank);
router.get("/dealer/allcashincardsApp/:dealer_Id", allcashincardsApp);
// router.post("/dealer/updatecashinbank/:id", updatecashinbank);

// router.get("/dealer/deletecashinbank/:id", deletecashinbank);

module.exports = router;
