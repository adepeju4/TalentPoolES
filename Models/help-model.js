/* eslint-disable comma-dangle */
module.exports = (sequelize, DataTypes) => {
  const Help = sequelize.define(
    'Help',
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
      reply_id_user_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['open', 'closed', 'escalate'],
        defaultValue: 'open',
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
  Help.associate = (model) => {
    Help.belongsTo(model.User, { foreignKey: 'user_id' });
  };
  return Help;
};
