module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER,
      },
      lastName: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      underscored: true,
    },
  );
  Admin.associate = ((models) => {
    Admin.belongsTo(models.User, { foreignKey: 'user_id' });
  });
  return Admin;
};
