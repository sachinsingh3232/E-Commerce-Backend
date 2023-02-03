// User defined middleware and routes
const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const errorMiddleware = require("./Middleware/error")
/*Express body-parser is an npm library used to process data sent through an HTTP request body. 
It exposes four express middlewares for parsing text, JSON, url-encoded and raw data set through 
an HTTP request body. These middlewares are functions that process incoming requests before they 
reach the target controller.*/
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
}))

const cookieParser = require('cookie-Parser');
/* Cookie Parser is a middleware of Node JS used to get cookie data. To get Cookie data in ExpressJS,
req. cookies property is used. req. cookies is an object that contains cookies sent by request in JSON after parsing */
app.use(cookieParser());



const userRoute = require('./Routes/userRoute');
const productRoute = require('./Routes/productRoute');
// app.use("/user", userRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1/product", productRoute);

app.use(errorMiddleware)
module.exports = app;
