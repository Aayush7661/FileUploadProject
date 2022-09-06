require('../models/productSchema')
const express = require("express")
const {
    insertquery,
    update,
    find_one,
    deleteQuery,
    find_all
} = require("../dbConnection/crude");
const fs = require("fs");
const table = require("../collections.json")
exports.upload_product = async(req, res) => {
    try {

        let fileArr = req.files;
        let fileNewArr = []
        for (let index = 0; index < fileArr.length; index++) {
            const element = fileArr[index];
            fileNewArr.push(element.filename)

        }
        const {
            name,
            price,
            color
        } = req.body;

        const param = {
            modelName: table.products,
            data: {
                name: name,
                color: color,
                price: price,
                product_img: fileNewArr,
            },
        };

        let insertData = await insertquery(param);

        return res.json({
            status: 1,
            msg: "success",
            msgType: "success",
            data: insertData

        });
    } catch (error) {
        return res.json({
            status: 0,
            msg: `${error.toString()}`,
            msgType: 'error'
        });
    }
}

exports.Product_edit = async(req, res) => {
    try {
        let {
            filename,
            name,
            price,
            color
        } = req.body
        if (filename) {
            let product_update = await update({
                modelName: table.products,
                where: {
                    product_img: filename,
                },
                updateData: {
                    $set: {
                        name: name,
                        price: price,
                        color: color
                    }
                },
                queryType: "updateOne"
            });

            return res.json({
                status: 1,
                msg: "success",
                msgType: "success",
                data: product_update
            });
        } else {
            throw new Error("please Enter filename")
        }

    } catch (error) {
        return res.json({
            status: 0,
            msg: `${error.toString()}`,
            msgType: 'error'
        });
    }
}

exports.delete_product = async(req, res) => {
    try {
        let file_message = "";
        let {
            filename
        } = req.body
        if (filename) {
            let q_params = {
                modelName: table.products,
                where: {
                    product_img: filename,
                },
            };
            const check_product = await find_one(q_params);
            if (Object.keys(check_product).length > 0) {
                let filePath = `${process.env.FILE_PATH}/${filename}`;

                let params = {
                    modelName: table.products,
                    query_type: "deleteOne",
                    condition: {

                        product_img: filename,
                    },
                };

                const deletbanner = await deleteQuery(params);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    file_message = {
                        message: "product deleted successfully.",
                        deletcount: deletbanner.deletedCount,
                    };
                } else {
                    file_message = "file not present in server";
                }
            } else {
                file_message = "file not present.";
            }

        } else {
            throw new Error("proper data not send")
        }
        return res.json({
            status: true,
            msg: "success",
            msgType: "success",
            data: file_message,
        });

    } catch (error) {
        return res.json({
            status: 0,
            msg: `${error.toString()}`,
            msgType: 'error'
        });
    }
}

exports.get_allproduct = async(req, res) => {
    try {
        const find_param = {
            modelName: table.products,
        };
        const templates = await find_all(find_param);
        return res.json({
            status: 1,
            msg: 'success',
            msgType: 'success',
            data: templates
        });
    } catch (error) {
        return res.json({
            status: 0,
            msg: `${error.toString()}`,
            msgType: 'error'
        });
    }
}

exports.ProductById = async(req, res) => {
    try {
        let {
            product_id
        } = req.body;

        if (product_id) {
            let q_params = {
                modelName: table.products,
                where: {
                    _id: product_id,
                },
            };
            const product_details = await find_one(q_params);
            return res.json({
                status: 1,
                msg: 'success',
                msgType: 'success',
                data: product_details
            });
        } else {
            throw new Error("please enter id")
        }
    } catch (error) {
        return res.json({
            status: 0,
            msg: `${error.toString()}`,
            msgType: 'error'
        });
    }
}

exports.get_Product_By_KeyWord = async(req, res) => {
    try {
        let {
            keyword
        } = req.body;
        if (keyword) {
            const q_params = {
                modelName: table.products,
                select: {
                    name: 1,
                    price: 1,
                    color: 1,
                    product_img: 1
                },
                where: ({
                    name: {
                        $regex: keyword
                    }
                })
            };

            const findproduct = await find_all(q_params);
            return res.json({
                status: 1,
                msg: 'success',
                msgType: 'success',
                data: findproduct
            });
        } else {
            throw new Error("please enter keywords")
        }
    } catch (error) {
        return res.json({
            status: 0,
            msg: `${error.toString()}`,
            msgType: 'error'
        });
    }
}