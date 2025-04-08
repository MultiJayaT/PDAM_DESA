const express = require("express");
const router = express.Router();
const { exportBillsToExcel, exportBillsToPDF } = require("../controllers/exportController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/excel", authenticate, exportBillsToExcel);
router.get("/pdf", authenticate, exportBillsToPDF);


module.exports = router;
