/* eslint-disable comma-dangle */
module.exports = (sequelize, DataTypes) => {
  const Activitylog = sequelize.define(
    'Activitylog',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true,
      },
    },
    {
      paranoid: true,
      underscored: true,
      // timestamp:false,
    }
  );
  // eslint-disable-next-line no-unused-vars
  // User.associate = function(models)
  // associations can be defined here
  //   };

  Activitylog.associate = (model) => {
    Activitylog.belongsTo(model.User, { foreignKey: 'user_id' });
  };

  return Activitylog;
};
