import express from "express";
import userController from "../controllers/userController";
import userValidation from "../middleware/uservalidation";

const route = express.Router();

route.post("/api/v1/auth/signup", userValidation.signup, userController.signup);

route.post("/api/v1/auth/signin", userValidation.signin, userController.signin);

export default route;
