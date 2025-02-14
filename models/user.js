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
  }, {
      tableName: 'Users',
  });

  return User;
};