/* eslint-disable comma-dangle */
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      id: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      role_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      underscored: true,

      // timestamp:false,
    }
  );

  // eslint-disable-next-line no-unused-vars
  Role.associate = (model) => {
    Role.hasMany(model.User);
  };

  return Role;
};
