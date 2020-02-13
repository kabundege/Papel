import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';
import tokenProvider from '../helpers/tokenProvider';
import responseHandler from '../helpers/responseHandler';
import Methods from '../helpers/dbMethods';

export default class userController {
  static async signup(req, res) {
    const {
      firstname, lastname, email, password, type, isadmin,
    } = req.body;
    const userid = uuidv4();
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Methods.insert(
        'users',
        'userid,firstname,lastname,email,password,type,isadmin',
        '$1,$2,$3,$4,$5,$6,$7',
        [userid, firstname, lastname, email, hashedPassword, type, isadmin],
        'userid,firstname,lastname,email',
      );

      const token = tokenProvider({
        userid: newUser.userid,
      });
      responseHandler.successful(201, 'user created successful', {
        token,
        user: newUser,
      });
      return responseHandler.send(res);
    } catch (err) {
      if (err.code === '23505') {
        responseHandler.error(409, new Error('user Already exists'));
        return responseHandler.send(res);
      }
    }
  }
  static async signin(req, res) {
    const { email, password } = req.body;
      const loginUser = await Methods.select("*", "users", `email='${email}'`);
      if (!loginUser['0']) {
        responseHandler.error(404, new Error("incorrect credentials"));
        return responseHandler.send(res);
      }
      
      if (!await bcrypt.compare(password,loginUser['0'].password)) {
        responseHandler.error(400, new Error("incorrect credentials"));
        return responseHandler.send(res);
      }
      const token = tokenProvider({
        userid: loginUser['0'].userid
      });
      responseHandler.successful(200, "User logged in successfully", {
        token,
        id: loginUser["0"].userid,
        firstName: loginUser["0"].firstname,
        lastName: loginUser["0"].lastname,
        email: loginUser["0"].email
      });
      return responseHandler.send(res);
  }
}
