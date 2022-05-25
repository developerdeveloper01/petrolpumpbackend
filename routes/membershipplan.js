const express = require("express");
const router = express.Router();
const {
  addmembershipplan,
  allmembershipplan,
  allmembershipplanApp,
  deletemembership,
  viewonemembership,
  updatemembership,
} = require("../controllers/membershipplan");

router.post("/dealer/addmembershipplan", addmembershipplan);
router.get("/dealer/allmembershipplan", allmembershipplan);
router.post("/dealer/updatemembership/:id", updatemembership);
router.get("/dealer/viewonemembership/:id", viewonemembership);

router.get("/dealer/allmembershipplanApp/:dealer_id", allmembershipplanApp);

router.get("/dealer/deletemembership/:id", deletemembership);

module.exports = router;
