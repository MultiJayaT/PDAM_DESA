const express = require("express");
const app = express();
require("dotenv").config();
const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const usageRoutes = require("./routes/usageRoutes");
const billRoutes = require("./routes/billRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const exportRoutes = require("./routes/exportRoutes");

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/usages", usageRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/export", exportRoutes);



sequelize
  .authenticate()
  .then(() => console.log("Koneksi database sukses ✅"))
  .catch((err) => console.error("Gagal koneksi DB ❌", err));

  sequelize.sync({ alter: true }).then(() => {
    console.log("Semua model berhasil disinkronisasi dengan database");
  })

app.get("/", (req, res) => {
  res.send("API PDAM Desa aktif 🚰");
});

module.exports = app;
