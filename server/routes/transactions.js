import express from "express";
import transController from "../controllers/transController";
import auth from '../middleware/auth';
import validation from "../middleware/transactions";

const route = express.Router();

route.post('/api/v1/transaction/:accountnumber/debit',auth.access,validation.trans,transController.debit)

export default route;
