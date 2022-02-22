const express = require("express");
const router = express.Router();

const {
  signupsendotp,
  verifyotp,
  addeditbasicdealershipform,
  addeditadvancedealershipform,
  alldealers
} = require("../controllers/dealershipform");

//Paths
router.post("/dealer/signupsendotp", signupsendotp);
router.post("/dealer/verifyotp", verifyotp);
router.get("/dealer/alldealers", alldealers);
router.post("/dealer/addeditbasicdealershipform/:id", addeditbasicdealershipform);
router.post("/dealer/addeditadvancedealershipform/:id", addeditadvancedealershipform);
// router.post("/user/editdealershipform/:id", editdealershipform);
// router.get("/user/viewonedealershipform/:id", viewonedealershipform);
// router.get("/user/alldealershipform", alldealershipform);
// router.get("/user/deletedealershipform/:id", deletedealershipform);

module.exports = router;
