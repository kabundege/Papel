import jwt from "jsonwebtoken";
import responseHandler from "../helpers/responseHandler";

export default class auth {
  static access(req, res, next) {
    const token = req.header("token");
    if (!token) {
      responseHandler.error(401, new Error("no token provided"));
      return responseHandler.send(res);
    }
    try {
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      req.user = decoded;
      next();
    } catch (ex) {
      responseHandler.error(401, new Error("token unAuthorized"));
      return responseHandler.send(res);
    }
  }
}
