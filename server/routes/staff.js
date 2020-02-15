import express from "express";
import staffController from "../controllers/staffController";
import auth from '../middleware/auth';

const route = express.Router();

route.get("/api/v1/accounts",auth.access,staffController.accounts);

export default route;
