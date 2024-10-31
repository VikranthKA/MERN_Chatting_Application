require('dotenv').config()
const express = require("express")
const { default: mongoose } = require('mongoose')
const userCltr = require('./app/controllers/userCltr')
const db = require('./db/dbConfig')
const cookieParser = require('cookie-parser');
const ws = require('ws')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cookieParser());
const cors = require("cors")

app.use(express.json())

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

mongoose.connect(process.env.MONGO_URL)

const PORT = process.env.PORT || 3333


db()


app.get("/test", (req, res) => {
    res.send('test ok')
})

const apiPrefixV1 = "/api/v1"

app.post(`${apiPrefixV1}/register`, userCltr.register)
app.get(`${apiPrefixV1}/profile`, userCltr.profile)
app.post(`${apiPrefixV1}/login`, userCltr.login)


const server = app.listen(PORT, () => {
    console.log("Server On!");
});

const wss = new ws.WebSocketServer({ server })

wss.on('connection', (connection, req) => {
    const cookies = req.headers.cookie;
    if (!cookies) {
        connection.close(1008, "Cookies not provided. Login required.");
        return;
    }

    const tokenCookieString = cookies.split(';').find(str => str.trim().startsWith('token='));
    if (!tokenCookieString) {
        connection.close(1008, "Token not found in cookies. Login required.");
        return;
    }

    const token = tokenCookieString.split('=')[1];
    if (!token) {
        connection.close(1008, "Token not provided. Login required.");
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err, userData) => {
        if (err) {
            connection.close(1008, "Token verification failed.");
            return;
        }

        const { userId, username } = userData;
        connection.userId = userId;
        connection.username = username;

        console.log("Connected clients:", [...wss.clients].map(c => c.username));

        [...wss.clients].forEach(client => {
            client.send(JSON.stringify({
                online: [...wss.clients].map(c => ({ userId: c.userId, username: c.username }))
            }
            ))
        })
    });


    connection.on('message', (message) => {
        console.log(`Message from ${connection.username}:`, message.toString());
    });
});
