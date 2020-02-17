import uuidv4 from "uuid/v4";
import responseHandler from "../helpers/responseHandler";
import Methods from "../helpers/dbMethods";

export default class staffController {
	static async debit(req,res){
		const {cashier,amount} = req.body;
		const id = req.params.accountnumber;
        const uuid  = uuidv4();
        let  user = await Methods.select('*','users',`userid='${req.user.userid}'`);

        if(isNaN(id)){
			responseHandler.error(400,new Error('The Account Number Must Be A Number'))
			return responseHandler.send(res)
		}

	    if(user['0'].type!=="staff"){
	      responseHandler.error(403,new Error('No Access'))
	      return responseHandler.send(res)
        }
        
        const userAcc = await Methods.select('*','accounts',`accountnumber='${id}'`);

        if (!userAcc['0']){
            responseHandler.error(404,new Error('Account Not Found'));
            return responseHandler.send(res);
        }

        if(userAcc['0'].balance<amount){
            responseHandler.error(409,new Error('insufficient Amount'))
            return responseHandler.send(res)
        }

        let newAmount = userAcc['0'].balance - amount;

        const trans = await Methods.insert('transactions',
        'transid,type,accountnumber,cashier,amount,oldbalance,newbalance',
        "$1,$2,$3,$4,$5,$6,$7",
        [uuid,'debit',id,cashier,amount,userAcc['0'].balance,newAmount],
        '*')
        const Acc = await Methods.update('accounts',`balance='${newAmount}',status='active'`,`accountnumber='${id}'`,'*');
        responseHandler.successful(200,'Account fetch successful',{
            transactionid: trans.transid,
            accountnumber: id,
            cashier: cashier,
            transactionType: 'credit',
            accountbalance: newAmount
        });
        return responseHandler.send(res);
	}   
}