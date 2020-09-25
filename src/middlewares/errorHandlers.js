exports.catchErrors = (fn) => {
	// with async/await we need some way to catch errors
	// this will replace try/catch in controllers
	// this wraps the fn in catchErr, catch errs and pass it along
	return function (req, res, next) {
		return fn(req, res, next).catch(next);
	};
};

exports.notFound = (req, res, next) => {
	const err = new Error('Route Or Page Not Found');
	err.status = 404;
	next(err);
};
