const { Bill, Customer, WaterUsage } = require("../models");

const getBillsByCustomer = async (req, res) => {
  const { customer_id } = req.params;

  try {
    const bills = await Bill.findAll({
      where: { customer_id },
      include: [
        { model: Customer, attributes: ["name", "address", "service_type"] },
        { model: WaterUsage, attributes: ["usage_m3", "month", "year"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ message: "Daftar tagihan ditemukan", data: bills });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil tagihan", error: err.message });
  }
};

const payBill = async (req, res) => {
    const { bill_id } = req.params;
  
    try {
      const bill = await Bill.findByPk(bill_id);
      if (!bill) return res.status(404).json({ message: "Tagihan tidak ditemukan" });
  
      if (bill.is_paid) return res.status(400).json({ message: "Tagihan sudah dibayar" });
  
      bill.is_paid = true;
      await bill.save();
  
      res.json({ message: "Tagihan berhasil dibayar", data: bill });
    } catch (err) {
      res.status(500).json({ message: "Gagal bayar tagihan", error: err.message });
    }
  };

  const filterBillsByMonthYear = async (req, res) => {
    const { month, year } = req.query;
  
    try {
      const bills = await Bill.findAll({
        include: [
          {
            model: WaterUsage,
            where: {
              month,
              year,
            },
          },
          {
            model: Customer,
            attributes: ["name", "address", "service_type"],
          },
        ],
      });
  
      res.json({
        message: `Daftar tagihan bulan ${month} tahun ${year}`,
        data: bills,
      });
    } catch (err) {
      res.status(500).json({ message: "Gagal filter tagihan", error: err.message });
    }
  };
  
  
  module.exports = {
    getBillsByCustomer,
    payBill,
    filterBillsByMonthYear,
  };
  
