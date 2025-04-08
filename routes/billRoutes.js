const express = require("express");
const router = express.Router();
const { getBillsByCustomer, payBill, filterBillsByMonthYear } = require("../controllers/billController");
const { authenticate } = require("../middleware/authMiddleware");

// Lihat semua tagihan milik satu warga
router.get("/customer/:customer_id", authenticate, getBillsByCustomer);

// Bayar tagihan
router.patch("/pay/:bill_id", authenticate, payBill);

router.get("/", authenticate, filterBillsByMonthYear);

module.exports = router;
