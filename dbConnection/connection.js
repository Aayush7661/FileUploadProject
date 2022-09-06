const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_URI, (err) => {
    if (err) console.log(err);
    else console.log("Mongo Connected");
});