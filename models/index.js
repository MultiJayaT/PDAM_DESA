const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User")(sequelize, DataTypes);
const Customer = require("./Customer")(sequelize, DataTypes);
const WaterUsage = require("./WaterUsage")(sequelize, DataTypes);
const Bill = require("./Bill")(sequelize, DataTypes);
const Payment = require("./Payment")(sequelize, DataTypes);

Customer.hasMany(WaterUsage, { foreignKey: "customer_id" });
WaterUsage.belongsTo(Customer, { foreignKey: "customer_id" });

Customer.hasMany(Bill, { foreignKey: "customer_id" });
Bill.belongsTo(Customer, { foreignKey: "customer_id" });

WaterUsage.hasOne(Bill, { foreignKey: "usage_id" });
Bill.belongsTo(WaterUsage, { foreignKey: "usage_id" });

Bill.hasOne(Payment, { foreignKey: "bill_id" });
Payment.belongsTo(Bill, { foreignKey: "bill_id" });

module.exports = {
    sequelize,
    User,
    Customer,
    WaterUsage,
    Bill,
    Payment,
};