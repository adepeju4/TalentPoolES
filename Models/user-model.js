/* eslint-disable comma-dangle */
/* eslint-disable func-names */
/* eslint-disable comma-dangle */
/* eslint-disable func-names */
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['0', '1'],
        allowNull: false,
        defaultValue: '0',
      },
      block: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      provider: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      auth_id: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      googleId: {
        type: DataTypes.STRING(250),
        allowNull: true,
        unique: true,
      },
      githubId: {
        type: DataTypes.STRING(250),
        allowNull: true,
        unique: true,
      },
      linkedinId: {
        type: DataTypes.STRING(250),
        allowNull: true,
        unique: true,
      },
      verification_token: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      email_verified_at: {
        type: 'TIMESTAMP',
        allowNull: true,
      },
      role_id: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      login_notif: {
        type: DataTypes.ENUM,
        values: ['0', '1'],
        allowNull: false,
        defaultValue: '1',
      },
      profile_notif: {
        type: DataTypes.ENUM,
        values: ['0', '1'],
        allowNull: false,
        defaultValue: '1',
      },
      verification_notif: {
        type: DataTypes.ENUM,
        values: ['0', '1'],
        allowNull: false,
        defaultValue: '1',
      },
      newsletter_notif: {
        type: DataTypes.ENUM,
        values: ['0', '1'],
        allowNull: false,
        defaultValue: '1',
      },

      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpire: 'BIGINT',
      // deleted_at: {
      //   type: 'TIMESTAMP',
      //   allowNull: true,
      // },
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
  User.associate = (model) => {
    User.hasOne(model.Employee, {
      onDelete: 'cascade',
    });

    User.hasOne(model.Employer, {
      onDelete: 'cascade',
    });

    User.hasOne(model.Address, {
      onDelete: 'cascade',
    });

    User.hasMany(model.Chat, {
      onDelete: 'cascade',
    });
    User.hasOne(model.Faq, {
      onDelete: 'cascade',
    });
    User.hasMany(model.Help, {
      onDelete: 'cascade',
    });

    User.hasMany(model.Review, {
      onDelete: 'cascade',
    });

    User.belongsTo(model.Role, {
      foreignKey: 'role_id',
    });

    User.hasMany(model.Activitylog, {
      onDelete: 'cascade',
    });
    User.hasOne(model.Admin, {
      onDelete: 'cascade',
    });
    // User.belongsToMany(model.Package, { through: 'Transaction', foreignKey: 'user_id' });
  };
  User.prototype.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
  };
  return User;
};
