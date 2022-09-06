const express = require("express")
require("../models/users")
const { insertquery, find_one } = require("../dbConnection/crude");
const table = require('../collections.json')
const { generate_token } = require("../helpers/authentication");

exports.registration = async(req, res) => {
    try {
        let {
            name,
            email,
            password
        } = req.body;
        if (!name || !email || !password) {
            throw new Error("all data not send")
        } else {
            const find_param = {
                modelName: table.users,
                where: {
                    email: email
                }
            };
            const check_user = await find_one(find_param);

            if (check_user) {
                return res.json({
                    status: 2,
                    msg: 'users Already Exist',
                    msgType: 'error'
                });
            }

            const param = {
                modelName: table.users,
                data: {
                    name: name,
                    email: email,
                    password: password,

                }
            };

            const insert = await insertquery(param);

            return res.json({
                status: 1,
                msg: 'Registration success',
                msgType: 'success',
                data: insert
            });
        }
    } catch (error) {
        return res.json({
            status: 0,
            msg: `${error.toString()}`,
            msgType: 'error'
        });
    }
}


exports.login_users = async(req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            throw new Error("proper data not send")
        } else {
            const find_param = {
                modelName: table.users,
                where: {
                    email: email,
                    password: password
                }
            };
            const validate_user = await find_one(find_param);
            if (validate_user) {

                const token = await generate_token(email);

                return res.json({
                    status: 1,
                    msg: "login successfully",
                    msgType: "success",
                    data: token
                });
            } else {
                throw new Error("user not Register")
            }
        }
    } catch (error) {
        return res.json({
            status: 0,
            msg: `${error.toString()}`,
            msgType: 'error'
        });
    }
}