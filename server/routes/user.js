import express from "express";
import userController from "../controllers/userController";
import userValidation from "../middleware/userValidation";

const route = express.Router();

route.post("/api/v1/auth/signup", userValidation.signup, userController.signup);

export default route;
