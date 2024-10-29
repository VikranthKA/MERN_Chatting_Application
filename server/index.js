require('dotenv').config()
const express = require("express")
const { default: mongoose } = require('mongoose')
const userCltr = require('./app/controllers/userCltr')
const db = require('./db/dbConfig')

const app = express()

mongoose.connect(process.env.MONGO_URL)

const PORT = process.env.PORT || 3333


db()


app.get("/test",(req,res)=>{
    res.send('test ok')
})

const apiPrefixV1 = "/api/v1"

app.post(`${apiPrefixV1}/register`,userCltr.register)


 
app.listen(PORT,()=>{
    console.log("Server On!")
})

