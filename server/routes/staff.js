import express from "express";
import staffController from "../controllers/staffController";
import auth from '../middleware/auth';
import validation from '../middleware/accountValidation'

const route = express.Router();

route.get("/api/v1/accounts",auth.access,staffController.accounts);

route.get("/api/v1/accounts/:accountenumber",auth.access,staffController.specificAccount);

route.patch("/api/v1/account/:accountenumber",auth.access,validation.status,staffController.activateDeactivate);

route.delete("/api/v1/accounts/:accountenumber",auth.access,staffController.Erase)

export default route;