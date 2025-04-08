const { Customer } = require("../models");

const addCustomer = async (req, res) => {
    try {
        const { name, address, service_type }= req.body;

        if (!["reguler", "subsidi"].includes(service_type)) {
            return res.status(400).json({ message: "Jenis Layanan tidak valid" });
        }

        const newCustomer = await Customer.create({
            name,
            address,
            service_type,
        });

        res.status(201).json({ message: "Warga berhasil ditambahkan", data: newCustomer });
    } catch (err) {
        res.status(500).json({ message: "Gagal menambahkan warga", error: err.message });
    }
};


module.exports = { addCustomer };