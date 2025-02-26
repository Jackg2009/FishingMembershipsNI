require('dotenv').config();
const express = require('express')
const cors = require('cors')
const authMiddleware = require('./middleware/authMiddleware')
const bodyParser = require('body-parser')
const mongoose = require("mongoose");

const routes = require( './routes/index');

const app = express()

const PORT = process.env.PORT;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(authMiddleware)

app.use('/', routes)
mongoose.connect(process.env.DB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

