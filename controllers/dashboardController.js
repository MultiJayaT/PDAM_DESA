const { Bill } = require("../models");
const { Op } = require("sequelize");

const getDashboardSummary = async (req, res) => {
  try {
    const allBills = await Bill.findAll();

    const totalBills = allBills.length;
    const totalPaid = allBills.filter(b => b.is_paid).length;
    const totalUnpaid = totalBills - totalPaid;
    const totalIncome = allBills
      .filter(b => b.is_paid)
      .reduce((sum, b) => sum + b.total_amount, 0);

    res.json({
      message: "Ringkasan dashboard",
      data: {
        total_bills: totalBills,
        total_paid: totalPaid,
        total_unpaid: totalUnpaid,
        total_income: totalIncome,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal ambil data ringkasan", error: err.message });
  }
};

module.exports = { getDashboardSummary };
