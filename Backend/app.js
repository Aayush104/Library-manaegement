const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()

const{multer, storage} = require("./Services/multerConfig");
require("./Models/index")

const authRoute = require("./Routes/authRoutes")
const bookRoute = require("./Routes/bookRoute")

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}))



app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('uploads/'))

app.use("", authRoute);
app.use("/book", bookRoute);

// server listening
app.listen (3000, () => {
    console.log("the project started in 3000 port")
})