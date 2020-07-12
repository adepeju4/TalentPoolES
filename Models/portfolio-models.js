/* eslint-disable comma-dangle */
module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define(
    'Portfolio',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING(255),
        defaultValue: null,
        allowNull: true,
      },
      employee_id: {
        type: DataTypes.STRING(255),
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
  // User.associate = function(models)
  // associations can be defined here
  //   };
  Portfolio.associate = (model) => {
    Portfolio.belongsTo(model.Employee, { foreignKey: 'employee_id' });
  };
  return Portfolio;
};
