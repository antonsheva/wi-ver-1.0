import * as Process from "process";

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
import router from './src/router'
const errorMiddleware = require('./src/middlewares/error-middleware')
const PORT = process.env.PORT || 5000;

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api', router)
app.use(errorMiddleware);

const db = require('./src/models');
db.sequelize.sync();
const start = async () =>{
    try{
        app.listen(PORT, () => console.log(`server started on port = ${PORT}`))
    }catch (e) {
        console.log(e)
    }
}
start();

