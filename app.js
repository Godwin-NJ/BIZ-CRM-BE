require('dotenv').config();
require('express-async-errors');

const express = require('express')
const cors = require('cors');
const app = express()


const crmRoute = require('./routes/biz')
const devRoute = require('./routes/dev')
const connectDB = require('./db/connect')

// error handler
const notFoundMiddleWare = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())

app.get('/',(req,res) => {
    res.send('hello world')
})


// biz-crm middleware
app.use('/crm/v1/auth',crmRoute)
app.use('/crm/v1/dev',devRoute)


app.use(cors());
app.use(notFoundMiddleWare)
app.use(errorMiddleware)


const port = process.env.PORT || 5000

const serverDB = async() => {
    try {
        await connectDB(process.env.BIZ_CRM )
        app.listen(port, console.log(`app listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

serverDB()

