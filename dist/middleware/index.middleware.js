"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = exports.notFoundMiddleware = void 0;
class CustomAPIError extends Error {
    constructor(message) {
        super(message);
    }
}
const notFoundMiddleware = (req, res) => {
    return res.status(404).json({ message: "page not found", success: false });
};
exports.notFoundMiddleware = notFoundMiddleware;
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log({ err });
    const defaultError = {
        statusCode: err.statusCode || 500,
        msg: err.message || "Something went wrong, try again later",
    };
    if (err instanceof CustomAPIError) {
        return res
            .status(defaultError.statusCode)
            .json({ message: defaultError.msg, sucess: false });
    }
    if (err.name === "ValidationError") {
        defaultError.statusCode = 500;
        defaultError.msg = Object.values(err.errors)
            .map((item) => item === null || item === void 0 ? void 0 : item.message)
            .join(",");
    }
    if (err.name = 'CastError') {
        defaultError.statusCode = 400;
        defaultError.msg = `Resourse not found. Invalid :${err.path}`;
    }
    if (err.code && err.code === 11000) {
        defaultError.statusCode = 400;
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
    }
    res
        .status(defaultError.statusCode)
        .json({ message: defaultError.msg, sucess: false });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//# sourceMappingURL=index.middleware.js.map