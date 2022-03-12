const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addstatutoryCertificate,
  allstatutoryCertificate,
  getonestatutoryCertificate,
  deletestatutoryCertificate,
  updateonestatutoryCertificate,



} = require("../controllers/statutoryCertificate");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log(file);
    let path = `./uploadesimages`;
    if (!fs.existsSync("uploadesimages")) {
      fs.mkdirSync("uploadesimages");
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploads = multer({ storage: storage });

let multipleUpload = uploads.fields([
  { name: "Upload_5l", maxCount: 1 },
  { name: "Upload_PESO", maxCount: 1 },
  { name: "Upload_Hydrometer", maxCount: 1 },
  { name: "uplodad_thermameter", maxCount:2},
  { name: "DPSL_upload", maxCount:1},
  { name: "upload_outher", maxCount:1},
  { name: "uplodad_air_gauage", maxCount:1}


]);

//PATHS

router.post("/dealer/addstatutoryCertificate", multipleUpload, addstatutoryCertificate);


router.get("/dealer/allstatutoryCertificate", allstatutoryCertificate);
router.get("/dealer/getonestatutoryCertificate/:id", getonestatutoryCertificate);
router.get("/dealer/deletestatutoryCertificate/:id", deletestatutoryCertificate);
router.post("/dealer/updateonestatutoryCertificate/:id", multipleUpload, updateonestatutoryCertificate);

module.exports = router;
