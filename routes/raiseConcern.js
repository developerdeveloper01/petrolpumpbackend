const express = require("express");
const router = express.Router();

const {
    addraiseConcern,
    allraiseConcern,
    getoneraiseConcern,
    deleteraiseConcern,
    updateraiseConcern,

} = require("../controllers/raiseConcern");

//Paths
router.post("/dealer/addraiseConcern", addraiseConcern);
router.get("/dealer/allraiseConcern", allraiseConcern);
router.get("/dealer/getoneraiseConcern/:id", getoneraiseConcern);
router.get("/dealer/deleteraiseConcern", deleteraiseConcern);
router.post("/dealer/updateraiseConcern/:id", updateraiseConcern);

module.exports = router;
