const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const expressSession = require('express-session')
const dbConnector = require('./DBHelper/DBConnector')
const userRoutes = require('./modules/Users/userRoutes')
const productRoutes = require('./modules/Products/productRoutes')
const port = 5000;


app.use(expressSession({
    secret: 'This is a secret key', resave: false,
    saveUninitialized: true
}))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/users', userRoutes)
app.use('/product', productRoutes)

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in starting the server at port ${port}`)
        return;
    }
    console.log("Successfully start server!")
    dbConnector.connectToDB();
})
