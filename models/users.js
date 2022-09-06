const mongoose = require("mongoose");

const users_data = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("users_datas", users_data);