const {  books } = require("../Models");
const fs = require('fs');
const bookModel = require("../Models/bookModel");
const { Op, where } = require("sequelize");

exports.AddBook = async (req, res) => {
    try {
        const { bookTitle, author, genre, isbn } = req.body;

        console.log(req.body)

        if (!req.file) {
            return res.status(400).json({ message: "Photo is required" });
        }

        const bookPhoto = `${process.env.IMAGE_URL}${req.file.filename}`;

        // Validate required fields
        if (!bookTitle || !author || !genre || !isbn) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if the book with the same ISBN already exists
        const existingBook = await books.findOne({ where: { isbn } });
        if (existingBook) {
            return res.status(400).json({ message: "Book with this ISBN already exists." });
        }

        // Create a new book entry
        const newBook = await books.create({
            bookTitle,
            author,
            genre,
            isbn,
            bookPhoto,
        });

        return res.status(201).json({ message: "Book added successfully!", book: newBook });
    } catch (error) {
        console.error("Error adding book:", error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
};


exports.AllBook = async (req,res)=>
{

     try {
        const booklist = await books.findAll();

    
        res.status(200).json(booklist);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }

    
}


exports.UpdateBook = async (req, res) => {
    try {

        console.log("hello")
        const { id } = req.params;
        const { bookTitle, author, genre, isbn } = req.body;
        const bookPhoto = req.file ? `${process.env.IMAGE_URL}${req.file.filename}` : null;

        console.log("id", id)

        console.log(req.body);

        // Validate required fields
        if (!bookTitle || !author || !genre || !isbn) {
            return res.status(400).json({ message: "All fields are required." });
        }


        // Update book entry
        const [updated] = await books.update(
            { bookTitle, author, genre, isbn, ...(bookPhoto && { bookPhoto }) },
            { where: { id: id } }
        );

        if (!updated) {
            return res.status(404).json({ message: "Book not found." });
        }

        return res.status(200).json({ message: "Book updated successfully!" });
    } catch (error) {
        console.error("Error updating book:", error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
};


exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the book before deleting
        const book = await books.findOne({ where: { id } });
        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }

        // Delete the book
        await books.destroy({ where: { id } });

        return res.status(200).json({ message: "Book deleted successfully!" });
    } catch (error) {
        console.error("Error deleting book:", error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
};
