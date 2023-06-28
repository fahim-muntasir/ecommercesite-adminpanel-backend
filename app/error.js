const notfound = (_req, _res, next) => {
    const error = new Error("Response not found!");
    error.status = 404;
    next(error);
};

const globalError = (error, _req, res, _next) => {
    if (error.status) {
        return res.status(error.status).json({
            message: error.message,
        });
    }

    res.status(500).json({
        message: "Something went wrong!",
    });
};

module.exports = { notfound, globalError };
