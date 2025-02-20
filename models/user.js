module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      role: {
          type: DataTypes.ENUM('aluno', 'professor'),
          allowNull: false,
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
  }, {
      tableName: 'Users',
  });

  User.associate = (models) => {
    User.hasMany(models.Comment, { foreignKey: "userId" });
  };

  return User;
};