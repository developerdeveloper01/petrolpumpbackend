const express = require("express");
const router = express.Router();
const {
  addcashcollected,
  allcashcollected,
    getoneexpenses,
    deleteexpenses,
    updateexpenses,
  } = require("../controllers/cashcollected");


 router .post("/dealer/addcashcollected", addcashcollected);
 router .get("/dealer/allcashcollected", allcashcollected);

// router.post("/dealer/updateexpenses/:id", updateexpenses);

// router.get("/dealer/getoneexpenses/:id", getoneexpenses);

// router.get("/dealer/deleteexpenses/:id", deleteexpenses);

module.exports = router;