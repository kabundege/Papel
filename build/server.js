"use strict";

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

const server = _http2.default.createServer(_app2.default);

const port = process.env.PORT || 1999;

_app2.default.listen(port, () => {
  console.log(` You are running port ${port}....`);
});