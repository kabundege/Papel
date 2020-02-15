import express from "express";
import staffController from "../controllers/staffController";
import auth from '../middleware/auth';

const route = express.Router();

route.get("/api/v1/accounts",auth.access,staffController.accounts);

route.get("/api/v1/accounts/:accountenumber",auth.access,staffController.specificAccount);

export default route;
