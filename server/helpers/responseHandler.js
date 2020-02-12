class Send {
  constructor() {
    this.statusCode = null;
    this.message = null;
    this.data = null;
  }

  successful(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  error(statusCode, error) {
    this.statusCode = statusCode;
    this.message = error.message;
    this.data = null;
  }

  send(res) {
    let result;
    if (this.data !== null) {
      result = {
        status: this.statusCode,
        message: this.message,
        data: this.data,
      };
    } else {
      result = {
        status: this.statusCode,
        error: this.message,
        data: this.data,
      };
      delete result.data;
    }
    return res.status(this.statusCode).json(result);
  }
}
export default new Send();
