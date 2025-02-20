module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'Comments',
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, { foreignKey: "userId" });
    };

    return Comment;
};