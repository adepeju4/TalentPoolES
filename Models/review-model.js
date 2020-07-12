/* eslint-disable comma-dangle */
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      rating: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      review_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
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
  Review.associate = (model) => {
    Review.belongsTo(model.User, { foreignKey: 'user_id' });
  };

  return Review;
};
