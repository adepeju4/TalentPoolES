/* eslint-disable comma-dangle */
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    'Team',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      Team_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employer_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['Pending', 'Accepted'],
        allowNull: false,
        defaultValue: 'Pending',
      },
    },
    {
      paranoid: true,
      underscored: true,
    },
  );

  return Team;
};
