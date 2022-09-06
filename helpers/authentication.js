const jwt = require("jsonwebtoken");

exports.generate_token = async(token_key) => {

    const token = jwt.sign({
            key: token_key
        },
        process.env.SECRET_KEY
    );
    return token;
};

exports.verify_token = async(req, res, next) => {

    const token = req.header('auth-token');

    if (!token) {
        return res.status(200).json({
            status: 0,
            message: 'Access Denied'
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if (err) {
            return res.json({
                status: 2,
                msgType: "error",
                msg: "Access Dined",
                data: `${err.toString()}`
            });
        }
        req.user = decoded;
        next();
    });
};