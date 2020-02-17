import express from "express";
import transController from "../controllers/transController";
import auth from '../middleware/auth';
import validation from "../middleware/transactions";

const route = express.Router();

route.get('/api/v1/transaction/:transid',auth.access,transController.specificTrans)

route.get('/api/v1/:accountnumber/transactions',auth.access,transController.userTrans)

route.post('/api/v1/transaction/:accountnumber/credit',auth.access,validation.trans,transController.credit)

route.post('/api/v1/transaction/:accountnumber/debit',auth.access,validation.trans,transController.debit)

export default route;
