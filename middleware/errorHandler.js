const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";
  let errors = null;

  // console.log("ERROR HANDLING");
  // console.log(err);

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = "Validation Error";
      errors = err.errors.map((el) => el.message);
      break;
    case "InvalidLogin":
      status = 401;
      message = err.message;
      break;
    case "BadCredentials":
    case "InvalidCredentials":
      status = 400;
      message = err.message || "Bad Credentials";
      break;
    case "TokenExpiredError":
      status = 401;
      // message = `Access token has expired ${err.expiredAt.toLocaleString()}`;
      message = "Access token has expired";
      break;
    case "Unauthenticated":
      status = 401;
      message = "Invalid token";
      errors = [`Unauthenticated error: ${err.message}`];
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token";
      errors = ["JsonWebTokenError"];
      break;
    case "Forbidden":
      status = 403;
      message = "Forbidden access";
      break;
    case "NotFoundError":
      status = 404;
      message = err.message;
      break;
    default:
      console.log(err);
      break;
  }

  const jsonResponse = { message };
  if (errors) jsonResponse.errors = errors;

  res.status(status).json(jsonResponse);
};

module.exports = errorHandler;