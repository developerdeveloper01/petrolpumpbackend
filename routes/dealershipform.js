const express = require("express");
const router = express.Router();

const {
  signupsendotp,
  verifyotp,
  addeditbasicdealershipform,
  addeditadvancedealershipform,
  viewonedealershipform,
  alldealers,
  deletedealershipform,
  addmasterCompny,
  allMasterOilCompany,
  getdealer,
  addproduct,
  allproduct,
  addcapacity,
  allcapacity,
  //gettankmap,
  deleteproduct,
  addstate,
  adddistrict,
  getdistrict,
  getstate,
  deletestate,
  logout,addtankmap,alltankmap
} = require("../controllers/dealershipform");

//Paths
router.post("/dealer/signupsendotp", signupsendotp);
router.post("/dealer/verifyotp", verifyotp);
router.post("/dealer/addeditbasicdealershipform/:id", addeditbasicdealershipform);
//router.post("/dealer/addeditadvancedealershipform/:id", addeditadvancedealershipform);
//router.post("/dealer/addeditadvancedealershipform", addeditadvancedealershipform);
router.get("/dealer/viewonedealershipform/:id", viewonedealershipform);
router.get("/dealer/alldealers", alldealers);
//router.get("/dealer/getdealer/:id", getdealer);
router.get("/dealer/deletedealershipform/:id", deletedealershipform);
router.post("/dealer/addmasterCompny", addmasterCompny);
router.get("/dealer/allMasterOilCompany", allMasterOilCompany);
router.post("/dealer/addproduct", addproduct);
router.get("/dealer/allproduct", allproduct);
router.post("/dealer/addcapacity", addcapacity);
router.get("/dealer/allcapacity", allcapacity);
router.get("/dealer/allcapacity", allcapacity);
//router.get("/dealer/gettankmap/:id", gettankmap);
router.get("/dealer/logout", logout);
router.post("/dealer/addtankmap",addtankmap);
router.get("/dealer/alltankmap", alltankmap);


module.exports = router;
