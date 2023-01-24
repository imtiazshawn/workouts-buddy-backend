const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const userAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    // Check if not Authenticate
    if (!authorization) {
        return res.status(401).json({ error: "Authorization Token Required!"});
    }

    // Check if Authenticate
    const token = authorization.split(' ')[1];

    try {
        const {_id} = jwt.verify(token, process.env.JWT_SIGN);

        req.user = await User.findOne({_id}).select('_id');

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Token is not Valid!"});
    };
};

module.exports = userAuth;