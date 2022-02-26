const express = require("express");
const router = express.Router();
const { addoutlet } = require("../controllers/designoutlet");
router.post("/dealer/addoutlet", addoutlet);
