module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("book", {
        bookTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, 
        },
        bookPhoto: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    return Book;
};
