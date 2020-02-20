import UserValidator from "../helpers/validation";
import responseHandler from "../helpers/responseHandler";
import errorString from "../helpers/error";

export default class userValidatorMid {
  
  static signup(req, res, next) {
    const { error } = UserValidator.signup(req.body);
    if (error) {
      const newMessage = errorString(error);
      responseHandler.error(400, new Error(newMessage));
      return responseHandler.send(res);
    }
    return next()
  }

  static reset(req, res, next) {
    const { error } = UserValidator.reset(req.body);
    if (error) {
      const newMessage = errorString(error);
      responseHandler.error(400, new Error(newMessage));
      return responseHandler.send(res);
    }
    return next()
  }

  static admin(req, res, next) {
    const { error } = UserValidator.admin(req.body);
    if (error) {
      const newMessage = errorString(error);
      responseHandler.error(400, new Error(newMessage));
      return responseHandler.send(res);
    }
    return next()
  }

  static signin(req, res, next) {
    const { error } = UserValidator.signin(req.body);
    if (error) {
      const newMessage = errorString(error);
      responseHandler.error(400, new Error(newMessage));
      return responseHandler.send(res);
    }
    return next();
  }

}
