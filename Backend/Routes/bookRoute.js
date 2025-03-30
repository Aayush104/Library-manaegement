const express = require("express");
const multer = require("multer");
const { storage } = require("../Services/multerConfig"); // Ensure storage is correctly imported
const { AddBook, AllBook, UpdateBook, deleteBook, requestRent, getRentRequest } = require("../Controller/bookController");

const upload = multer({ storage: storage }); // Initialize multer with storage

const router = express.Router();

// Define the route for adding a book
router.post("/add-book", upload.single("bookPhoto"), AddBook);
router.post("/update-book/:id", upload.single("bookPhoto"), UpdateBook);
router.post("/delete-book/:id", deleteBook);
router.get("/AllBooks", AllBook);
router.post("/requestRents", requestRent);
router.get("/getRentRequest", getRentRequest);

module.exports = router;
