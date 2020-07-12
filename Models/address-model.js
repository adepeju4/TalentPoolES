/* eslint-disable comma-dangle */
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    line1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    line2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      defaultValue: null,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    postal_code: {
      type: DataTypes.STRING(200),
      defaultValue: null,
    },
    landmark: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    paranoid: true,
    underscored: true,
  });

  Address.associate = (model) => {
    Address.belongsTo(model.User, { foreignKey: 'user_id' });
  };

  return Address;
};
