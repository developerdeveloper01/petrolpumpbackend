const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    addDsnform,
    getDsnform,
    getoneDsnform,
    deleteDsnform,
    editDsnform
} = require("../controllers/dsnform");
router.post("/dealer/addDsnform", addDsnform);
router.get("/dealer/getDsnform", getDsnform);
router.get("/dealer/getoneDsnform/:id", getoneDsnform);
router.get("/dealer/deleteDsnform/:id", deleteDsnform);
 router.get("/dealer/updateoneDSN/:id", editDsnform);

module.exports = router;