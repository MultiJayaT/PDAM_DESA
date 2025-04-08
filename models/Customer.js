module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Customer", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        service_type: {
          type: DataTypes.ENUM("Reguler", "Subsidi"),
          allowNull: false,
        },
      }, {
        tableName: "customers" // penting! lowercase & konsisten
      });
      
  
    return Customer;
  };
  