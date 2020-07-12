/* eslint-disable comma-dangle */
module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define(
    'Package',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: DataTypes.INTEGER,
      },
      package_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      package_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      package_id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      underscored: true,
      // timestamp:false,
    },
  );
  // eslint-disable-next-line no-unused-vars
  // User.associate = function(models)
  // associations can be defined here
  //   };
  Package.associate = (model) => {
    Package.belongsToMany(model.Employer, {
      through: 'Transaction',
      foreignKey: 'package_id',
    });
  };

  return Package;
};
