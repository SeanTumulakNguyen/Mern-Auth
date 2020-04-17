const User = require('../models/user')

exports.signup = (req, res) => {
    // console.log('REQ BODY ON SIGNUP', req.body)
    const { name, email, password } = req.body
    
}