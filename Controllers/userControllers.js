const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');

// Create Token 
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SIGN, { expiresIn: '3d' });
}

// Login User
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);

        // Token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
}

// Signup User
const signupUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.signup(email, password);

        // Token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { loginUser, signupUser };