const express = require("express");
const router = express.Router();

const {
  signupsendotp,
  verifyotp,
  addeditbasicdealershipform,
  addeditadvancedealershipform,
  viewonedealershipform,
  alldealers,
  deletedealershipform
} = require("../controllers/dealershipform");

//Paths
router.post("/dealer/signupsendotp", signupsendotp);
router.post("/dealer/verifyotp", verifyotp);
router.post("/dealer/addeditbasicdealershipform/:id", addeditbasicdealershipform);
router.post("/dealer/addeditadvancedealershipform/:id", addeditadvancedealershipform);
router.get("/user/viewonedealershipform/:id", viewonedealershipform);
router.get("/dealer/alldealers", alldealers);
router.get("/user/deletedealershipform/:id", deletedealershipform);

module.exports = router;
