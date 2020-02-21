import express from "express";
import staffController from "../controllers/staffController";
import auth from '../middleware/auth';
import validation from '../middleware/accountValidation'

const route = express.Router();

route.get("/api/v1/accounts",auth.access,staffController.accounts);

route.get("/api/v1/user/accounts/:accountNumber",auth.access,staffController.specificAccount);

route.get("/api/v1/account?:params",auth.access,staffController.createriaAccounts);

route.patch("/api/v1/account/:accountNumber",auth.access,validation.status,staffController.activateDeactivate);

route.delete("/api/v1/accounts/:accounteNumber",auth.access,staffController.Erase)

export default route;
