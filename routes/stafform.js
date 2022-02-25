const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    addstaff,
    allstaff,
    getonestaff,
    deletestaff  ,
    updateonestaff
  //verifyotp,
   
//   addeditadvancedealershipform,
//   viewonedealershipform,
//   alldealers,
//   deletedealershipform
} = require("../controllers/stafform");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     let path = `./img`;
//     if (!fs.existsSync("img")) {
//       fs.mkdirSync("img");
//     }
//     cb(null, path);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype.includes("jpeg") ||
//     file.mimetype.includes("png") ||
//     file.mimetype.includes("jpg")
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// let uploads = multer({ storage: storage });


router.post("/dealer/addstaff", addstaff);
router.get("/dealer/allstaff", allstaff);
router.get("/dealer/getonestaff/:id", getonestaff);
router.get("/dealer/deletestaff/:id", deletestaff);
router.get("/dealer/updateonestaff/:id", updateonestaff);



module.exports = router;