const express = require("express");
const router = express.Router();
const {
  addrsp,
  allrsp,
  getonersp,
  updatersp,
  deletersp,
} = require("../controllers/rsp");
router.post("/dealer/addrsp", addrsp);
router.get("/dealer/allrsp", allrsp);
router.get("/dealer/getonersp/:id", getonersp);

router.post("/dealer/updatersp/:id", updatersp);

router.get("/dealer/deletersp/:id", deletersp);

module.exports = router;
