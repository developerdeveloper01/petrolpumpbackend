const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  // allstatutoryCertificate,
  // getonestatutoryCertificate,
  // deletestatutoryCertificate,
  // updateonestatutoryCertificate,
  addcan5lFM,
  allcan5lFMApp,
  getonecan5lFMApp,
  updatecan5lFM,
  deletecan5lFM,
  addPESO_FM,
  allPESO_FM,
  allPESO_FMApp,
  getonePESO_FM,
  updatePESO_FM,
  deletePESO_FM,
  addhydrometerFM,
  allhydrometerFM,
  allhydrometerFMApp,
  getonehydrometerFM,
  updatehydrometerFM,
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
  { name: "Upload_Document", maxCount: 1 },
  // { name: "Upload_PESO", maxCount: 1 },
  // { name: "Upload_Hydrometer", maxCount: 1 },
  // { name: "uplodad_thermameter", maxCount: 2 },
  // { name: "DPSL_upload", maxCount: 1 },
  // { name: "upload_outher", maxCount: 1 },
  // { name: "uplodad_air_gauage", maxCount: 1 },
]);

//PATHS

router.post("/dealer/addcan5lFM", multipleUpload, addcan5lFM);

// router.get("/dealer/allstatutoryCertificate", allstatutoryCertificate);
router.get("/dealer/allcan5lFMApp/:dealer_Id", allcan5lFMApp);
router.get("/dealer/getonecan5lFMApp/:id", getonecan5lFMApp);
router.post("/dealer/updatecan5lFM/:id", multipleUpload, updatecan5lFM);
router.get("/dealer/deletecan5lFM/:id", deletecan5lFM);
///PESO_FM
router.post("/dealer/addPESO_FM", multipleUpload, addPESO_FM);
router.get("/dealer/allPESO_FM", allPESO_FM);
router.get("/dealer/allPESO_FMApp/:dealer_Id", allPESO_FMApp);
router.get("/dealer/getonePESO_FM/:id", getonePESO_FM);
router.post("/dealer/updatePESO_FM/:id", multipleUpload, updatePESO_FM);
router.get("/dealer/deletePESO_FM/:id", deletePESO_FM);

////addhydrometerFM
router.post("/dealer/addhydrometerFM", multipleUpload, addhydrometerFM);
router.get("/dealer/allhydrometerFM", allhydrometerFM);
router.get("/dealer/allhydrometerFMApp/:dealer_Id", allhydrometerFMApp);
router.get("/dealer/getonehydrometerFM/:id", getonehydrometerFM);
router.post(
  "/dealer/updatehydrometerFM/:id",
  multipleUpload,
  updatehydrometerFM
);
module.exports = router;
