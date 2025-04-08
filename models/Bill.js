module.exports = (sequelize, DataTypes) => {
    const Bill = sequelize.define("Bill", {
        usage_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        customer_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        total_bill: DataTypes.FLOAT,
        is_paid: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      }, {
        tableName: "bills"
      });
      
  
    return Bill;
  };
  