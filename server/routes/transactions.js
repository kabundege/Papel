import express from "express";
import transController from "../controllers/transController";
import auth from '../middleware/auth';
import validation from "../middleware/transactions";

const route = express.Router();

route.get('/api/v1/transaction/:transId',auth.access,transController.specificTrans)

route.get('/api/v1/:accountNumber/transactions',auth.access,transController.userTrans)

route.post('/api/v1/transaction/:accounteNumber/credit',auth.access,validation.trans,transController.credit)

route.post('/api/v1/transaction/:accountNumber/debit',auth.access,validation.trans,transController.debit)

export default route;
