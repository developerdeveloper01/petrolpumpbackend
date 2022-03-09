const express = require("express");
const router = express.Router();
const {
    addlubricantsales,
  alllubricantsales,
  getonelubricantsales,
    deletelubricantsales,
    updatelubricantsales,
  } = require("../controllers/lubricantsales");


 router .post("/dealer/addlubricantsales", addlubricantsales);
 router .get("/dealer/alllubricantsales", alllubricantsales);

router.post("/dealer/updatelubricantsales/:id", updatelubricantsales);

router.get("/dealer/getonelubricantsales/:id", getonelubricantsales);

router.get("/dealer/deletelubricantsales/:id", deletelubricantsales);

module.exports = router;