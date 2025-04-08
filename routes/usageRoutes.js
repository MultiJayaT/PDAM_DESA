const express = require("express");
const router = express.Router();
const { addUsage } = require("../controllers/usageController");

router.post("/", addUsage);


module.exports = router;