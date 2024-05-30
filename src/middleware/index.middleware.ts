import { NextFunction, Response, Request } from "express";

class CustomAPIError extends Error {
    constructor(message: string) {
        super(message);
    }
}

const notFoundMiddleware = (req: Request, res: Response) => {
    return res.status(404).json({ message: "page not found", success: false });
};

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log({ err })
    const defaultError = {
        statusCode: err.statusCode || 500,
        msg: err.message || "Something went wrong, try again later",
    };

    if (err instanceof CustomAPIError) {
        return res
            .status(defaultError.statusCode)
            .json({ message: defaultError.msg, success: false });
    }

    if (err.name === "ValidationError") {
        defaultError.statusCode = 500;
        defaultError.msg = (Object.values(err.errors) as { message: string }[])
            .map(item => item.message)
            .join(",");
    }

    if (err.name === 'CastError') {
        defaultError.statusCode = 400;
        defaultError.msg = `Resource not found. Invalid: ${err.path}`;
    }

    if (err.code && err.code === 11000) {
        defaultError.statusCode = 400;
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
    }

    res
        .status(defaultError.statusCode)
        .json({ message: defaultError.msg, success: false });
};

export {
    notFoundMiddleware, 
    errorHandlerMiddleware
}
