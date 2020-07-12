/* eslint-disable comma-dangle */
module.exports = (sequelize, DataTypes) => {
  const Faq = sequelize.define(
    'Faq',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
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
  Faq.associate = (model) => {
    Faq.belongsTo(model.User, { foreignKey: 'user_id' });
  };

  return Faq;
};
