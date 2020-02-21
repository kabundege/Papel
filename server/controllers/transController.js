import uuidv4 from "uuid/v4";
import mailer from '../helpers/mailer'
import responseHandler from "../helpers/responseHandler";
import Methods from "../helpers/dbMethods";

export default class staffController {
	static async debit(req,res){
		const {amount} = req.body;
		const id = req.params.accountNumber;
        const uuid  = uuidv4();

        if(typeof(amount)!== 'number'){
            responseHandler.error(400,new Error('The Amount Must Be A Number'))
			return responseHandler.send(res)
        }

        if(isNaN(id)){
			responseHandler.error(400,new Error('The Account Number Must Be A Number'))
			return responseHandler.send(res)
		}

        let  user = await Methods.select('*','users',`userid='${req.user.userid}'`);

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
            responseHandler.error(406,new Error('insufficient Amount'))
            return responseHandler.send(res)
        }

        let newAmount = userAcc['0'].balance - amount;

        const trans = await Methods.insert('transactions',
        'transid,type,accountnumber,cashier,amount,oldbalance,newbalance',
        "$1,$2,$3,$4,$5,$6,$7",
        [uuid,'debit',id,req.user.userid,amount,userAcc['0'].balance,newAmount],
        '*') 

        
        mailer.main(user['0'],{
            transactionId: trans.transid,
            accountNumber: id,
            cashier: req.user.userid,
            transactionType: 'debit',
            accountBalance: newAmount
        })

        const Acc = await Methods.update('accounts',`balance='${newAmount}',status='active'`,`accountnumber='${id}'`,'*');
        
        responseHandler.successful(200,'Debit Done successfuly',{
            transactionId: trans.transid,
            accountNumber: id,
            cashier: req.user.userid,
            transactionType: 'debit',
            accountBalance: newAmount
        });
        return responseHandler.send(res);
    }
    
    static async credit(req,res){
		const {amount} = req.body;
		const id = req.params.accounteNumber;
        const uuid  = uuidv4();

        if(typeof(amount)!=='number'){
            responseHandler.error(400,new Error('The Amount Must Be A Number'))
			return responseHandler.send(res)
        }

        if(isNaN(id)){
			responseHandler.error(400,new Error('The Account Number Must Be A Number'))
			return responseHandler.send(res)
		}

        let  user = await Methods.select('*','users',`userid='${req.user.userid}'`);

	    if(user['0'].type!=="staff"){
	      responseHandler.error(403,new Error('No Access'))
	      return responseHandler.send(res)
        }
        
        const userAcc = await Methods.select('*','accounts',`accountnumber='${id}'`);

        if (!userAcc['0']){
            responseHandler.error(404,new Error('Account Not Found'));
            return responseHandler.send(res);
        }

        let newAmount = userAcc['0'].balance + amount;

        const trans = await Methods.insert('transactions',
        'transid,type,accountnumber,cashier,amount,oldbalance,newbalance',
        "$1,$2,$3,$4,$5,$6,$7",
        [uuid,'debit',id,req.user.userid,amount,userAcc['0'].balance,newAmount],
        '*')

        mailer.main(user['0'],{
            transactionId: trans.transid,
            accountNumber: id,
            cashier: req.user.userid,
            transactionType: 'debit',
            accountBalance: newAmount
        })

        const Acc = await Methods.update('accounts',`balance='${newAmount}',status='active'`,`accountnumber='${id}'`,'*');
        
        responseHandler.successful(200,'Debit Done successfuly',{
            transactionId: trans.transid,
            accountNumber: id,
            cashier: req.user.userid,
            transactionType: 'debit',
            accountBalance: newAmount
        });
        return responseHandler.send(res);
    }
    
    static async userTrans(req,res){
        const AccNumber = req.params.accountNumber;
        let  user = await Methods.select('*','users',`userid='${req.user.userid}'`);
			if (isNaN(AccNumber)){
				responseHandler.error(400,new Error('the AccountNumber Must Be A Number '));
				return responseHandler.send(res);
			}
			const transcs = await Methods.select('*','transactions',`accountnumber='${AccNumber}'`);
			if (!transcs['0']){
	  		responseHandler.error(404,new Error('No Transaction Found'));
	  		return responseHandler.send(res);
	  	}
	  	responseHandler.successful(200,'Transaction fetch successful',{data: transcs});
	  	return responseHandler.send(res);
    }
    
    static async specificTrans(req,res){
        const id = req.params.transId;
        let trans;
        let  author = await Methods.select('*','users',`userid='${req.user.userid}'`);

        if(!author['0'].isadmin&&author['0'].type!=="staff"){

        trans = await Methods.select('*','transactions',`transid='${id}'`);

        if (!trans['0']){
        responseHandler.error(404,new Error('Transaction Not Found'));
        return responseHandler.send(res);
        }else{
            const Acc = method.select('*','account',`owner='${req.user.userid}'`)
            if(!user['0']){
                responseHandler.error(404,new Error('No account found'))
                return responseHandler.send(res)
            }

            Acc.foreach(async (el) => {
                trans = await Method.select('*','transactions','accountnumber='${el}''')
            })

        }
          
	  	responseHandler.successful(200,'Transaction fetch successful',{data: trans['0']});
	  	return responseHandler.send(res);
	}
}