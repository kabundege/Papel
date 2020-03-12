import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';
import random from 'random-int';
import passport from 'passport'
import emailValidator from 'email-validator';
import passowrdValidator from 'joi-password-complexity';
import mailer from '../helpers/mailer'
import tokenProvider from '../helpers/tokenProvider';
import responseHandler from '../helpers/responseHandler';
import Methods from '../helpers/dbMethods';
import dotenv from 'dotenv'

dotenv.config()

export default class userController {
  static async signup(req, res) {
    const {
      firstName, lastName, email, password,confirmPassword
    } = req.body;
    const {error} = passowrdValidator().validate(password)
    if(error){
      responseHandler.error(400, new Error('Password example : aPassword123!'));
      return responseHandler.send(res);
    }
    if (password != confirmPassword) {
      responseHandler.error(400, new Error('UnMaching Password'));
      return responseHandler.send(res);
    }
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
        [userid, firstName.trim(), lastName.trim(), email.trim(), hashedPassword, 'client',false],
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

  static async reset(req, res) {
    const {
       password,confirmPassword
    } = req.body;

    const id = req.user.userid ;

    const {error} = passowrdValidator().validate(password)

    if(error){
      responseHandler.error(400, new Error('Password example : aPassword123!'));
      return responseHandler.send(res);
    }
    
    if (password != confirmPassword) {
      responseHandler.error(400, new Error('UnMaching Password'));
      return responseHandler.send(res);
    }
      const hashedPassword = await bcrypt.hash(password, 10);

      const resetUser = await Methods.update(
        'users',
        `password = '${hashedPassword}'`,
        `userid='${id}'`
        ,'userid,firstname,lastname,email,password',
      );

      const token = tokenProvider({
        userid: resetUser.userid,
      });

      responseHandler.successful(200, 'reset successful ', {
        token,
        NewPassword: password,
      });
      return responseHandler.send(res);
  }

  static async email(req,res){
    const {email} = req.body;

    const user = await Methods.select('*','users',`email='${email}'`)

    if(!user['0']){
      responseHandler.error(404, new Error("Email Not Found"));
      return responseHandler.send(res);
    }

    const token = tokenProvider({
      userid: user['0'].userid
    });

    mailer.reset(user['0'],token)

    responseHandler.successful(200,'Check your email')
    return responseHandler.send(res)

  }

  static async auth(req,res){
    let firstname, lastname, oauthUser ;
    const userid = uuidv4();
    
    if(req.user.provider === 'github'){
        firstname = req.user.displayName
    }else{
        firstname = req.user.name.familyName
        lastname = req.user.name.givenName
    }
    const loginUser = await Methods.select(
      "*",
      "users", 
      `${req.user.provider}id='${req.user.id}'`);
    const exist = await Methods.select(
      "*",
      "users", 
      `email='${req.user.emails[0].value}'`);
  
      if (loginUser[0]) {
        oauthUser = loginUser[0]
      }else if(exist[0]){
          oauthUser = exist[0]
        }else{
         
        const newUser = await Methods.insert(
          'users',
          `userid,firstname,lastname,email,type,isadmin,${req.user.provider}id`,
          '$1,$2,$3,$4,$5,$6,$7',
          [userid, firstname, lastname, req.user.emails[0].value, 'client', false,req.user.id],
          `'userid,firstname,lastname,email,${req.user.provider}'`,
        );
        oauthUser = newUser
    }

    const token = tokenProvider({
      userid: oauthUser.userid
    });
    
    responseHandler.successful(200, "User logged in successfully", {
      token,
      id: oauthUser.userid,
      firstName: oauthUser.firstname,
      email: oauthUser.email,
      lastName: oauthUser.lastname
    });
    return responseHandler.send(res);
  }

  static async out(req,res){
      req.logOut()
      res.redirect('/index')
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
      res.cookie({
        name: token
      })
      responseHandler.successful(200, "User logged in successfully", {
        token,
        id: loginUser["0"].userid,
        firstName: loginUser["0"].firstname,
        lastName: loginUser["0"].lastname,
        email: loginUser["0"].email
      });
      return responseHandler.send(res);
  }

  static async admin(req, res) {
    const {
      firstName, lastName, email, password,confirmPassword, type, isAdmin,
    } = req.body;

    const {error} = passowrdValidator().validate(password)
    if(error){
      responseHandler.error(400, new Error('password must have lowercase, uppercase, symbols and a number'));
      return responseHandler.send(res);
    }

    let  author = await Methods.select('*','users',`userid='${req.user.userid}'`);
    if(!author['0'].isadmin){
      responseHandler.error(403,new Error('No Access'))
      return responseHandler.send(res)
    }

    if (password != confirmPassword) {
      responseHandler.error(400, new Error('UnMaching Password'));
      return responseHandler.send(res);
    }
    const userid = uuidv4();
    const signupUser = await Methods.select("*", "users", `email='${email}'`);
      if (signupUser['0']) {
        responseHandler.error(409, new Error('user Already exists'));
        return responseHandler.send(res);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Methods.insert(
        'users',
        'userid,firstname,lastname,email,password,type,isAdmin',
        '$1,$2,$3,$4,$5,$6,$7',
        [userid, firstName.trim(), lastName.trim(), email.trim(), hashedPassword, type, isAdmin],
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

  static async createAcc(req, res) {
    const { type } = req.body;
    let accnumber = random(10000000,1000000000)
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
        [accid, accnumber, user['0'].userid, type,0],
        "accountnumber,type,balance"
      );
      responseHandler.successful(201, "user created successful", {
        accountNumber: newAcc.accountnumber,
        firstName: user["0"].firstname,
        lastName: user["0"].lastname,
        type: newAcc.type,
        openingbalance: newAcc.balance
      });
      return responseHandler.send(res);
  }

  static async AllAcc(req,res){
    let email = req.params.email;
      let  author = await Methods.select('*','users',`userid='${req.user.userid}'`);
      if(!author['0'].isadmin&&author['0'].type!=="staff"){
        responseHandler.error(403,new Error('No Access'))
        return responseHandler.send(res)
      }
      if(!emailValidator.validate(email)){
        responseHandler.error(400, new Error("Invalid email type"));
        return responseHandler.send(res);
      }
      const user = await Methods.select('*','users',`email='${email}'`);
      if(!user['0']){
        responseHandler.error(404, new Error("Email not Found"));
        return responseHandler.send(res);
      }
      const Acc = await Methods.select('*','accounts',`owner='${user['0'].userid}'`);
      if(!Acc['0']){
        responseHandler.error(404, new Error("No Account Found"));
        return responseHandler.send(res);
      }
      responseHandler.successful(200,"Account Fetch successful",{data : Acc});
      return responseHandler.send(res);
  }
}
