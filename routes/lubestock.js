const express = require("express");
const router = express.Router();
const {
  addlubestock,
  alllubestock,
    getonelubestock,
    deletelubestock,
    updatelubestock,
  } = require("../controllers/lubestock");


 router .post("/dealer/addlubestock", addlubestock);
 router .get("/dealer/alllubestock", alllubestock);

router.post("/dealer/updatelubestock/:id", updatelubestock);

router.get("/dealer/getonelubestock/:id", getonelubestock);

router.get("/dealer/deletelubestock/:id", deletelubestock);

module.exports = router;