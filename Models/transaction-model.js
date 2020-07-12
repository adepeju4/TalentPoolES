/* eslint-disable comma-dangle */
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      plan_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      transaction_status: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      transaction_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      employer_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      package_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      paranoid: true,
      underscored: true,
      // timestamp:false,
    },
  );
  return Transaction;
};
