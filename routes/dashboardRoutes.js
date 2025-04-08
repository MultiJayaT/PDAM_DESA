const express = require("express");
const router = express.Router();
const { getDashboardSummary } = require("../controllers/dashboardController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/summary", authenticate, getDashboardSummary);

module.exports = router;
