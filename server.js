require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const {readdirSync} = require("fs")

const hdlError = require("./middlewares/error")
const hdlNotFound = require("./middlewares/not-found")


app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


readdirSync("./routes").map((file) => {
    console.log('here',file)
    app.use("/", require(`./routes/${file}`));
  });
  

app.use(hdlError)
app.use("*",hdlNotFound)





const port = process.env.PORT || 9000
app.listen(port,()=>console.log("Server is running on",port))