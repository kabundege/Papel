import express, { Router } from "express";
import passport from 'passport';
import dotenv from 'dotenv';
import userController from "../controllers/userController";
import userValidation from "../middleware/uservalidation";
import accountValidation from "../middleware/accountValidation";
import auth from '../middleware/auth';
import passportSetup from '../config/passport'

const route = express.Router();

dotenv.config()

route.use(passport.session()) 

route.post("/api/v1/auth/signup", userValidation.signup, userController.signup);

route.patch("/api/v1/auth/reset",auth.reset, userValidation.reset, userController.reset);

route.post("/api/v1/auth/email",userValidation.email,userController.email)

route.post("/api/v1/auth/signup/admin",auth.access, userValidation.admin, userController.admin)

route.post("/api/v1/auth/signin", userValidation.signin, userController.signin);

route.get("/api/v1/auth/google",passport.authenticate('google',{scope:['profile','email']}));

route.get('/auth/google/redirect',passport.authenticate('google'),userController.auth)

route.get("/api/v1/auth/facebook",passport.authenticate('facebook',{scope:['email']}));

route.get('/auth/facebook/redirect',passport.authenticate('facebook',{failureRedirect:'/index'}),userController.auth)

route.get("/api/v1/auth/github",passport.authenticate('github'));

route.get('/auth/github/redirect',passport.authenticate('github',{failureRedirect:'/index'}),userController.auth)

route.get('/auth/google/logout',passport.authenticate('google'),userController.out)

route.get('/auth/github/logout',passport.authenticate('github'),userController.out)

route.post("/api/v1/user/account",auth.access,accountValidation.createAcc, userController.createAcc);

route.get("/api/v1/user/:email/accounts",auth.access, userController.AllAcc);

export default route;
