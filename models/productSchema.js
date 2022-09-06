const mongoose = require("mongoose");

const product_data = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    product_img: {
        type: Array,
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("product_datas", product_data);