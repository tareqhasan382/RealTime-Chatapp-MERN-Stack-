import ApiError from "../../errors/ApiError";
import { ZodError } from "zod";
import { handleZodError } from "../../errors/handleZodError";

//=================IGenericErrorMessage==============

export const handleValidationError = (error) => {
  const errors = Object.values(error.errors).map((el) => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

//====================globalErrorHandler=============
const globalErrorHandler = (error, req, res, next) => {
  config.env === "development"
    ? console.log("global Error handler", error)
    : console.log("global Error handler", error);

  let statusCode = 500;
  let message = "Something went to wrong!";
  let errorMessages = [];

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: process.env !== "production" ? error?.stack : undefined,
  });
  next();
};

module.exports = globalErrorHandler;
