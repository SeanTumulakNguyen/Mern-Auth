const User = require('../models/user');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
require('dotenv');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// exports.signup = (req, res) => {
//     // console.log('REQ BODY ON SIGNUP', req.body)
//     const { name, email, password } = req.body

//     User.findOne({ email }).exec((err, user) => {
//         if (user) {
//             return res.status(400).json({
//                 error: "Email is taken"
//             })
//         }
//     })

//     let newUser = new User({name, email, password})

//     newUser.save((err, success) => {
//         if (err) {
//             console.log('SIGNUP ERROR', err)
//             return res.status(400).json({
//                 error: err
//             })
//         }
//         res.json({
//             message: 'Signup success! Please sign in.'
//         })
//     })
// }

exports.signup = (req, res) => {
	const { name, email, password } = req.body;
	User.findOne({ email }).exec((err, user) => {
		if (user) {
			return res.status(400).json({
				error: 'Email is taken'
			});
		}

		const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '1d' });

		const emailData = {
			from: process.env.EMAIL_FROM,
			to: email,
			subject: `Account Activation Link`,
			html: `
                <p>Please use the following link to activate your account.</p>
                <p>${process.env.CLIENT_URL}/auth/activate</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        };
        
        sgMail.send(emailData).then(sent => {
            // console.log('SIGNUP EMAIL SENT', sent)
            return res.json({
                message: `Email has been sent to ${email}. Follow the instruction to activate your account.`
            })
        })
	});
};
