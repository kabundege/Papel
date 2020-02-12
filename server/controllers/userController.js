import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';
import random from 'random-int';
import emailValidator from 'email-validator'
import tokenProvider from '../helpers/tokenProvider';
import responseHandler from '../helpers/responseHandler';
import Methods from '../helpers/dbMethods';

export default class userController {
  static async signup(req, res) {
    const {
      firstname, lastname, email, password, type, isadmin,
    } = req.body;
    const userid = uuidv4();
    const signupUser = await Methods.select("*", "users", `email='${email}'`);
      if (signupUser['0']) {
        responseHandler.error(409, new Error('user Already exists'));
        return responseHandler.send(res);
      }
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
  
  static async createAcc(req, res) {
    const { openingbalance, type } = req.body;
    const accnumber = random(10000000,1000000000)
    const accid = uuidv4();
      if(type!=='saving'&&type!=='current'){
        responseHandler.error(400,new Error('the  type must be saving or current'))
        return responseHandler.send(res)
      }
      const user = await Methods.select("*", "users", `userid='${req.user.userid}'`);
      const newAcc = await Methods.insert(
        "accounts",
        "accid,accountnumber,owner,type,balance",
        "$1,$2,$3,$4,$5",
        [accid, accnumber, user['0'].userid, type,openingbalance],
        "accountnumber,type,balance"
      );
      responseHandler.successful(201, "user created successful", {
        accountnumber: newAcc.accountnumber,
        firstName: user["0"].firstname,
        lastName: user["0"].lastname,
        type: newAcc.type,
        openingbalance: newAcc.balance
      });
      return responseHandler.send(res);
  }

  static async AllAcc(req,res){
      let email = req.params.email;

      if(!emailValidator.validate(email)){
        responseHandler.error(400, new Error("Must be a Valid email"));
        return responseHandler.send(res);
      }
      
      const user = await Methods.select('*','users',`email='${email}'`);
      if(!user['0']){
        responseHandler.error(404, new Error("Email's user was not Found"));
        return responseHandler.send(res);
      }

      const Acc = await Methods.select('*','accounts',`owner='${user['0'].userid}'`);
      if(!Acc['0']){
        responseHandler.error(404, new Error("No Account on the Email Found"));
        return responseHandler.send(res);
      }
      responseHandler.successful(200,"Account Fetch successful",{data : Acc});
      return responseHandler.send(res);
  }
}
