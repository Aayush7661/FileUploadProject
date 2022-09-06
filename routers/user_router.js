const routers = require('express').Router()
const { registration, login_users } = require('../controller/users');

routers.post("/signUp", registration);
routers.post("/signIn", login_users);

module.exports = routers;