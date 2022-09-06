require("dotenv").config();
require('./dbConnection/connection')
const express = require("express");
const endpoints = require('./routers/endpoints')
const app = express();


app.use(express.json());
endpoints(app)
app.listen(process.env.PORT_NUMBER, (err) => {
    console.log("server connected");
    if (err) console.log(err);
});