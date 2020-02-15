import UserValidator from "../helpers/validation";
import responseHandler from "../helpers/responseHandler";
import errorString from "../helpers/error";
 
export default class userValidatorMid {
  static createAcc(req, res, next) {
    const { error } = UserValidator.createAcc(req.body);
    if (error) {
      const newMessage = errorString(error);
      responseHandler.error(400, new Error(newMessage));
      return responseHandler.send(res);
    }
    return next();
  }
  
}
