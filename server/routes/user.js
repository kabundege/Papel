import express from "express";
import userController from "../controllers/userController";
import userValidation from "../middleware/uservalidation";
import accountValidation from "../middleware/accountValidation";
import auth from '../middleware/auth';

const route = express.Router();

route.post("/api/v1/auth/signup", userValidation.signup, userController.signup);

route.post("/api/v1/auth/signin", userValidation.signin, userController.signin);

route.post("/api/v1/account",auth.access,accountValidation.createAcc, userController.createAcc);

export default route;
