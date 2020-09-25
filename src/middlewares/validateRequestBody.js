function validateRequestBody(mandatory) {
	return async (req, res, next) => {
		try {
			for (requiredField of mandatory) {
				if (!req.body[requiredField]) {
					return res.status(400).json({
						error: `${requiredField} is a required field`,
					});
				}
			}
			next();
		} catch (err) {
			next(err);
		}
	};
}

module.exports = validateRequestBody;
