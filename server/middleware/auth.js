import jwt from "jsonwebtoken";
import Methods from '../helpers/dbMethods'
import responseHandler from "../helpers/responseHandler";

export default class auth {
  static async access(req, res, next) {
    const token = req.header("token");
    if (!token) {
      responseHandler.error(401, new Error("no token provided"));
      return responseHandler.send(res);
    }
 
    try {
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      req.user = decoded;
      let  author = await Methods.select('*','users',`userid='${req.user.userid}'`);
      if(!author['0']){
        responseHandler.error(401,new Error('Token has expired'))
        return responseHandler.send(res)
      }
      next();
    } catch (ex) {
      responseHandler.error(401, new Error("token unAuthorized"));
      return responseHandler.send(res);
    }
  }

  static async reset(req, res, next) {
    const token = req.header('token')

    if (!token) {
      responseHandler.error(401, new Error("No Token Provided"));
      return responseHandler.send(res);
    }
 
    try {
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      req.user = decoded;
      let  author = await Methods.select('*','users',`userid='${req.user.userid}'`);
      if(!author['0']){
        responseHandler.error(401,new Error('Token has expired'))
        return responseHandler.send(res)
      }
      next();
    } catch (ex) {
      responseHandler.error(401, new Error("token unAuthorized"));
      return responseHandler.send(res);
    }
  }
}
