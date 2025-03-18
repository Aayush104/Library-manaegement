const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()

require("./Models/index")

const authRoute = require("./Routes/authRoutes")

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}))



app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("", authRoute);
// server listening
app.listen (3000, () => {
    console.log("the project started in 3000 port")
})