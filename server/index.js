require('dotenv').config()
const express = require("express")
const { default: mongoose } = require('mongoose')
const cookieParser = require('cookie-parser');
const ws = require('ws')
const jwt = require('jsonwebtoken')
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 3333

const db = require('./db/dbConfig')
const authRoute = require('./app/routes/auth.routes')
const messageRoute = require('./app/routes/message.routes')
const userRoute = require('./app/routes/user.routes')


app.use(cookieParser());
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))



app.use("/api/auth",authRoute)
app.use("/api/messages",messageRoute)
app.use("/api/users",userRoute)

const server = app.listen(PORT, () => {
    db()
    console.log("Server On!");
});

const wss = new ws.WebSocketServer({ server })

