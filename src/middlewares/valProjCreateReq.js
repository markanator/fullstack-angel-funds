function validateCreateProject(req, res, next) {
	return (req, res, next) => {
		try {
			const required = [
				"projectTitle",
				"projectStory",
				"goalFunding",
				// 'userID',
			];
			for (requiredField of required) {
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
module.exports = validateCreateProject;
