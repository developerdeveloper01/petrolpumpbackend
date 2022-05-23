const express = require("express");
const router = express.Router();
const {
  addmembershipplan,
  allmembershipplan,
  allmembershipplanApp,
  deletemembership,
  viewonemembership,
  alllubestockApp,
} = require("../controllers/membershipplan");

router.post("/dealer/addmembershipplan", addmembershipplan);
router.get("/dealer/allmembershipplan", allmembershipplan);

router.post("/dealer/viewonemembership/:id", viewonemembership);

router.get("/dealer/allmembershipplanApp/:dealer_id", allmembershipplanApp);

router.get("/dealer/alllubestockApp/:dealer_name1", alllubestockApp);
router.get("/dealer/deletemembership/:id", deletemembership);

module.exports = router;
