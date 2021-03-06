import express from "express";
import userController from "../controllers/userController";
import userValidation from "../middleware/uservalidation";
import accountValidation from "../middleware/accountValidation";
import auth from '../middleware/auth';

const route = express.Router();

route.post("/api/v1/auth/signup", userValidation.signup, userController.signup);

route.patch("/api/v1/auth/reset",auth.reset, userValidation.reset, userController.reset);

route.post("/api/v1/auth/email",userValidation.email,userController.email)

route.post("/api/v1/auth/signup/admin",auth.access, userValidation.admin, userController.admin)

route.post("/api/v1/auth/signin", userValidation.signin, userController.signin);

route.post("/api/v1/user/account",auth.access,accountValidation.createAcc, userController.createAcc);

route.get("/api/v1/user/:email/accounts",auth.access, userController.AllAcc);

export default route;
