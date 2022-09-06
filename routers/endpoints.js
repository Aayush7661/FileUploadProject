const initializeEndPoints = (app) => {
    app.use("/users", require('./user_router'))
    app.use("/product", require('./product_router'))
}

module.exports = initializeEndPoints;