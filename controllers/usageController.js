const { WaterUsage, Customer, Bill } = require("../models");

const addUsage = async (req, res) => {
    try {
        const { customer_id, usage_m3, month, year } = req.body;

        const customer = await Customer.findByPk(customer_id);
        if (!customer) return res.status(404).json({ message: "Warga tidak ditemukan", });

        const usage = await WaterUsage.create({
            customer_id,
            usage_m3,
            month,
            year,
        });


        const pricePerM3 = customer.service_type === "reguler" ? 5000 : 4000;
        const totalAmount = usage_m3 * pricePerM3;

        const bill = await Bill.create({
            customer_id,
            usage_id: usage.id,
            total_amount: totalAmount,
            id_paid: false,
        });

        res.status(201).json({
            message: "Data pemakaian dan tagihan berhasil ditambahkan",
            usage,
            bill,
        });
    } catch (err) {
        res.status(500).json({ message: "Gagal input pemakaian", error: err.message });
    }
};


module.exports = { addUsage };