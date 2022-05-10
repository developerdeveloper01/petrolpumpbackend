const express = require("express");
const router = express.Router();
const {
  DSM_wise_Cash_Collection,
  //   alldsmclosing,
  //   getonedsmclosing,
  //   deletedsmclosing,
  //   updatedsmclosing,
  //   alldsmclosingApp,
} = require("../controllers/DSM_wise_Cash_Collection");
router.post("/dealer/DSM_wise_Cash_Collection", DSM_wise_Cash_Collection);
// router.get("/dealer/alldsmclosing", alldsmclosing);
// router.get("/dealer/getonedsmclosing/:id", getonedsmclosing);
// router.get("/dealer/alldsmclosingApp/:dealer_name1", alldsmclosingApp);
// router.get("/dealer/deletedsmclosing/:id", deletedsmclosing);

// router.post("/dealer/updatedsmclosing/:id", updatedsmclosing);

module.exports = router;
