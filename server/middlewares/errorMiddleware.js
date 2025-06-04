const notFound = (req, res, next) => {
  const error = new Error(`🔍 Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.error("--- ERROR ---");
  console.error("Message:", err.message);
  if (process.env.NODE_ENV === "development") {
    console.error("Stack:", err.stack);
  }
  console.error("---------------");

  let statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500) || 500;


  if (statusCode < 400) {
    statusCode = 500;
  }
  res.status(statusCode).json({
    message: err.message || "An unexpected server error occurred.",
    success: false,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = { notFound, errorHandler };