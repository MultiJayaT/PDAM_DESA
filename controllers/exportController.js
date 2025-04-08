const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const { Bill, Customer, WaterUsage } = require("../models");

const exportBillsToExcel = async (req, res) => {
  const { month, year } = req.query;

  try {
    const bills = await Bill.findAll({
      include: [
        { model: Customer, attributes: ["name", "address", "service_type"] },
        {
          model: WaterUsage,
          where: { month, year },
          attributes: ["usage_m3"],
        },
      ],
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`Laporan ${month}-${year}`);

    worksheet.columns = [
      { header: "No", key: "no", width: 5 },
      { header: "Nama", key: "name", width: 20 },
      { header: "Alamat", key: "address", width: 25 },
      { header: "Jenis", key: "type", width: 12 },
      { header: "Pemakaian (m3)", key: "usage", width: 15 },
      { header: "Total Tagihan", key: "amount", width: 15 },
      { header: "Status", key: "status", width: 15 },
    ];

    bills.forEach((bill, index) => {
      worksheet.addRow({
        no: index + 1,
        name: bill.Customer.name,
        address: bill.Customer.address,
        type: bill.Customer.service_type,
        usage: bill.WaterUsage.usage_m3,
        amount: bill.total_amount,
        status: bill.is_paid ? "LUNAS" : "BELUM LUNAS",
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=laporan_tagihan_${month}_${year}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ message: "Gagal export data", error: err.message });
  }
};



const exportBillsToPDF = async (req, res) => {
  const { month, year } = req.query;

  try {
    const bills = await Bill.findAll({
      include: [
        { model: Customer, attributes: ["name", "address", "service_type"] },
        {
          model: WaterUsage,
          where: { month, year },
          attributes: ["usage_m3"],
        },
      ],
    });

    const doc = new PDFDocument({ margin: 40, size: "A4" });

    // Header
    doc.fontSize(16).text(`LAPORAN TAGIHAN PDAM`, { align: "center" });
    doc.fontSize(12).text(`Bulan: ${month} / Tahun: ${year}`, { align: "center" });
    doc.moveDown();

    // Table header
    doc.font("Helvetica-Bold");
    doc.text("No", 40, doc.y);
    doc.text("Nama", 70, doc.y);
    doc.text("Alamat", 160, doc.y);
    doc.text("Jenis", 270, doc.y);
    doc.text("Pemakaian", 340, doc.y);
    doc.text("Tagihan", 420, doc.y);
    doc.text("Status", 490, doc.y);
    doc.moveDown(0.5);
    doc.font("Helvetica");

    // Table rows
    bills.forEach((bill, index) => {
      doc.text(index + 1, 40, doc.y);
      doc.text(bill.Customer.name, 70, doc.y);
      doc.text(bill.Customer.address, 160, doc.y);
      doc.text(bill.Customer.service_type, 270, doc.y);
      doc.text(`${bill.WaterUsage.usage_m3} m³`, 340, doc.y);
      doc.text(`Rp ${bill.total_amount}`, 420, doc.y);
      doc.text(bill.is_paid ? "LUNAS" : "BELUM", 490, doc.y);
      doc.moveDown();
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=laporan_tagihan_${month}_${year}.pdf`);

    doc.pipe(res);
    doc.end();
  } catch (err) {
    res.status(500).json({ message: "Gagal export PDF", error: err.message });
  }
};


module.exports = { exportBillsToExcel, exportBillsToPDF };
