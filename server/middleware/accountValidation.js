import Validator from "../helpers/validation";
import responseHandler from "../helpers/responseHandler";
import errorString from "../helpers/error";
 
export default class userValidatorMid {
  static createAcc(req, res, next) {
    const { error } = Validator.createAcc(req.body);
    if (error) {
      const newMessage = errorString(error);
      responseHandler.error(400, new Error(newMessage));
      return responseHandler.send(res);
    }
    return next();
  }

  static status(req, res, next) {
    const { error } = Validator.status(req.body);
    if (error) {
      const newMessage = errorString(error);
      responseHandler.error(400, new Error(newMessage));
      return responseHandler.send(res);
    }
    return next();
  }
  
  
}
