class CustomError extends Error {
  constructor(statusCode, message, description) {
    super(`code: ${statusCode}, message: ${message}, description: ${description}`);
    this.statusCode = statusCode;
    this.message = message;
    this.description = description;
  }
}



module.exports = CustomError;