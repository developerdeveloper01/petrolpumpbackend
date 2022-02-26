const express = require("express");
const router = express.Router();
const { adminlogin } = require("../controller/adminlogin");

router.post("/admin/adminlogin", adminlogin);
