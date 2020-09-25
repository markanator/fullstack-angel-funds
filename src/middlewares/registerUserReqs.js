const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const createUserRequirements = async (req, res, next) => {
	try {
		req.body.userRole = req.body.userRole.toLowerCase();
		req.body.email = req.body.email.toLowerCase();
		if (req.body.userRole !== 'user' && req.body.userRole !== 'investor') {
			return res
				.status(400)
				.json({ error: 'User role must be user or investor' });
		}
		const usedEmail = await User.findByEmail(req.body.email);
		const usedUsername = await User.findByUsername(req.body.username);
		if (usedEmail) {
			return res
				.status(400)
				.json({ error: 'Account with that email already exists' });
		}
		if (usedUsername) {
			return res
				.status(400)
				.json({ error: 'Account with that username already exists' });
		}
		const hash = bcrypt.hashSync(req.body.password, 14);
		req.body.password = hash;
		req.body.avatarUrl = gravatar.url(req.body.email, {
			protocol: 'https',
			d: 'mm',
		});
		next();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'Server is malfunctioning' });
	}
};

module.exports = createUserRequirements;
