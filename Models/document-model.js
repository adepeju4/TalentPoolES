module.exports = (sequelize, DataTypes) => {
  const Employerdocument = sequelize.define(
    'Employerdocument',
    {
      id: {
        allowNull: false,
        unique: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      document_id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false,
      },
      document_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      document_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      file_link: {
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

  Employerdocument.associate = (model) => {
    Employerdocument.belongsTo(model.Employer, {
      foreignKey: 'employer_id',
    });
  };

  return Employerdocument;
};
