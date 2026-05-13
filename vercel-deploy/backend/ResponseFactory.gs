/**
 * ResponseFactory
 * Unified structure for API responses to ensure consistency across the system.
 */
const ResponseFactory = {
  /**
   * Generates a success response.
   * @param {Object|Array} data The data to return.
   * @param {string} message Optional success message.
   * @returns {Object} Structured success response.
   */
  success: function(data, message = 'Success') {
    return {
      success: true,
      message: message,
      data: data,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Generates an error response.
   * @param {string} message The error message.
   * @param {string} errorCode Short error code for client-side handling.
   * @param {Object} details Additional error details.
   * @returns {Object} Structured error response.
   */
  error: function(message, errorCode = 'ERROR', details = null) {
    return {
      success: false,
      message: message,
      errorCode: errorCode,
      details: details,
      timestamp: new Date().toISOString()
    };
  }
};
