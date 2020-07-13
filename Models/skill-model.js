/* eslint-disable comma-dangle */
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    'Skill',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      skill_description: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      employee_id: {
        type: DataTypes.STRING,
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
  Skill.associate = (model) => {
    Skill.belongsTo(model.Employee, { foreignKey: 'employee_id' });
  };

  return Skill;
};
