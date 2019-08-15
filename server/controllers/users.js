const Sequelize = require('sequelize');
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const {JWT_SECRET} = require('../config');

// User.sync();
signToken = user => {
    return JWT.sign({
        iss: 'Tsengel',
        sub: user.email,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
}
 
module.exports = {
    signUp: async (req, res, next) => {
        console.log('UsersController.signUp() called');
        const { email, password } = req.value.body;
        const foundUser = await User.findOne({where : { email: email }});
        if (foundUser) { 
            console.log(foundUser.email);
            return res.status(403).json({ error: 'email is already in use'});
        }
        const newUser = await User.create({ email, password });
        const token = signToken(newUser);
        
        res.status(200).json({ token });
    },
    signIn: async (req, res, next) => {
        console.log('UsersController.signIn() called');
    },
    secret: async (req, res, next) => {
        console.log('UsersController.secret() called');
        res.json({ secret: "resource"});
    }
}