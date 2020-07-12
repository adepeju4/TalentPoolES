/* eslint-disable comma-dangle */
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    'Employee',
    {
      id: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      user_type: {
        type: DataTypes.ENUM,
        values: ['HNG', 'NON-HNG'],
        allowNull: false,
        defaultValue: 'NON-HNG',
      },
      verification_status: {
        type: DataTypes.ENUM,
        values: ['Approved', 'Disapproved', 'Pending'],
        allowNull: false,
        defaultValue: 'Pending',
      },
      first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phone_no: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
      },
      picture_url: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      gender: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      hng_id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      dob: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      avaliability: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      employee_access_id: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      employee_cv: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      views: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      employee_id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      referredBy: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      paranoid: true,
      underscored: true,
    },
  );
  Employee.associate = (model) => {
    Employee.belongsTo(model.User, { foreignKey: 'user_id' });
    Employee.hasMany(model.Portfolio, {
      onDelete: 'cascade',
    });

    Employee.hasMany(model.Skill, {
      onDelete: 'cascade',
    });

    Employee.belongsToMany(model.Employer, {
      through: 'Team',
      foreignKey: 'employee_id',
    });
  };
  return Employee;
};
