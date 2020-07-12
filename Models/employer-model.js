/* eslint-disable comma-dangle */
module.exports = (sequelize, DataTypes) => {
  const Employer = sequelize.define(
    'Employer',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: DataTypes.INTEGER,
      },
      employer_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      company_category_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employer_type: {
        type: DataTypes.ENUM,
        values: ['Individual', 'Company'],
        allowNull: false,
        defaultValue: 'Individual',
      },
      sex: {
        type: DataTypes.ENUM,
        values: ['Male', 'Female', 'Organization'],
        allowNull: false,
        defaultValue: 'Organization',
      },

      verification_status: {
        type: DataTypes.ENUM,
        values: ['Approved', 'Disapproved', 'Pending'],
        allowNull: false,
        defaultValue: 'Pending',
      },
      employer_id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
      },
      employer_phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      employer_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      employer_address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      employer_country: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      employer_photo: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      facebook: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      twitter: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      linkedin: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      instagram: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      hear_about_us: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      paranoid: true,
      underscored: true,
    },
  );

  Employer.associate = (model) => {
    Employer.hasMany(model.Employerdocument, {
      onDelete: 'cascade',
    });

    Employer.belongsTo(model.Company_category, {
      foreignKey: 'company_category_id',
    });
    Employer.belongsTo(model.User, { foreignKey: 'user_id' });
    Employer.belongsToMany(model.Package, {
      through: 'Transaction',
      foreignKey: 'employer_id',
    });
    Employer.belongsToMany(model.Employee, {
      through: 'Team',
      foreignKey: 'employer_id',
    });
  };
  return Employer;
};
