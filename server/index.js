require('dotenv').config()
const express = require("express")
const { default: mongoose } = require('mongoose')
const userCltr = require('./app/controllers/userCltr')
const db = require('./db/dbConfig')
const cookieParser = require('cookie-parser');
const ws = require('ws')
const jwt= require('jsonwebtoken')



const app = express()
app.use(cookieParser());
const cors = require("cors")

app.use(express.json())

app.use(cors({
    credentials:true,
    origin:process.env.CLIENT_URL
}))

mongoose.connect(process.env.MONGO_URL)

const PORT = process.env.PORT || 3333


db()


app.get("/test",(req,res)=>{
    res.send('test ok')
})

const apiPrefixV1 = "/api/v1"

app.post(`${apiPrefixV1}/register`,userCltr.register)
app.get(`${apiPrefixV1}/profile`,userCltr.profile)
app.post(`${apiPrefixV1}/login`,userCltr.login)

 
const server = app.listen(PORT,()=>{
    console.log("Server On!")
})

const wss = new ws.WebSocketServer({server})

wss.on('connection',(connection,req)=>{
    // console.log('connected')
    // connection.send('hello')
    // console.log(req.headers,"h")

    const cookies = req.headers.cookie
    if(!cookies){
        return res.status(401).json({
            error: "cookies not provided",
            message: "You must be logged in to access this resource"
        });
    }
    const tokenCookieString = cookies.split(';').find(str=>str.startsWith('token='))
    if(!tokenCookieString){
        return res.status(401).json({
            error: "cookies not found",
            message: "not found"
        });
    }

    const token = tokenCookieString.split('=')[1]
    if(!token){
        return res.status(401).json({
            error: "token not provided",
            message: "You must be logged in to access this resource"
        });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err, userData) => {
        if (err) throw err;
        const {userId,username} = userData;
        connection.userId = userId;
        connection.username = username
        connection.username = username
    });

    console.log([...wss.clients].map(c=>c.username))
})






