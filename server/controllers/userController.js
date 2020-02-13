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
}
