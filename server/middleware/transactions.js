
import Validator from "../helpers/validation";
import responseHandler from "../helpers/responseHandler";

export default class userValidatorMid {
static trans(req, res, next) {
    const { error } = Validator.trans(req.body);
    if (error) {
        const newMessage = error;
        responseHandler.error(400, new Error(newMessage));
        return responseHandler.send(res);
    }
    return next();
    }
}
  