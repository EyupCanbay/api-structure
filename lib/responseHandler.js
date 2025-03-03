class ResponseHandler {
    static success(message, data = null) {
      return { success: true, message, data };
    }
  
    static error(error) {
      return { success: false, message: error.message, description: error.description };
    }
  }
  
  module.exports = ResponseHandler;