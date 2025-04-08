module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    bill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_date: DataTypes.DATE,
    amount_paid: DataTypes.FLOAT,
  });

  return Payment;
};
