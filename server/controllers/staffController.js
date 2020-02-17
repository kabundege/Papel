import responseHandler from "../helpers/responseHandler";
import Methods from "../helpers/dbMethods";
 
export default class staffController {
  	static async accounts(req,res){
	    let allAccounts ;
	    let  user = await Methods.select('*','users',`userid='${req.user.userid}'`);
	    if(!user['0'].isadmin&&!user['0'].type!=="staff"){
	      responseHandler.error(403,new Error('No Access'))
	      return responseHandler.send(res)
	    }

	    allAccounts = await Methods.select('*','accounts');
	    if(!allAccounts['0']){
	      responseHandler.error(404,new Error('No Accounts Found'))
	      return responseHandler.send(res)
	    }
	    responseHandler.successful(200,'the fecth was successful',{data : allAccounts})
	    return responseHandler.send(res)
	} 
	
	static async specificAccount(req,res){
		let id = req.params.accountenumber; 

			let  user = await Methods.select('*','users',`userid='${req.user.userid}'`);
			if(!user['0'].isadmin&&!user['0'].type!=="staff"){
				responseHandler.error(403,new Error('No Access'))
				return responseHandler.send(res)
			}
		   if(isNaN(id)){
			   responseHandler.error(400,new Error('The Account Number Must Be A Number'))
			   return responseHandler.send(res)
		   }
		   let Acc = await Methods.select('*','accounts',`accountnumber='${id}'`);
		   if(!Acc['0']){
			   responseHandler.error(404,new Error('Account Not Found'))
			   return responseHandler.send(res)
		   }
		   responseHandler.successful(200,'Account fetch successful',{data : Acc['0']})
		   return responseHandler.send(res)
	}
	
	static async activateDeactivate(req,res){
		let id = req.params.accountenumber; 
		const {status} = req.body;
		
		let  accOwner = await Methods.select('*','users',`userid='${req.user.userid}'`);
		if(!accOwner['0'].isadmin){
			responseHandler.error(403,new Error('You are not Allowed'))
			return responseHandler.send(res)
		}

		if(isNaN(id)){
			responseHandler.error(400,new Error('The Account Number Must Be A Number'))
			return responseHandler.send(res)
		}
		
		if(status!=='active'&&status!=='dormant'){
			responseHandler.error(400,new Error('Invalid status'))
			return responseHandler.send(res)
		}

		let user = await Methods.select('*','Accounts',`accountnumber = '${id}'`)
		if(!user['0']){
			responseHandler.error(404,new Error('Account Not Found'))
			return responseHandler.send(res)
		}
		let Acc = await Methods.update('accounts',`status='${status}'`,`accountnumber='${id}'`,'*');
		responseHandler.successful(200,'Account fetch successful',Acc)
		return responseHandler.send(res)
	}  
	
	static async Erase(req,res){
	  	let id = req.params.accountenumber; 
		let  accOwner = await Methods.select('*','users',`userid='${req.user.userid}'`);
		if(!accOwner['0'].isadmin&&accOwner['0'].type!=='staff'){
			responseHandler.error(403,new Error('You are not Allowed'))
			return responseHandler.send(res)
		}
		if(isNaN(id)){
			responseHandler.error(400,new Error('The Account Number Must Be A Number'))
			return responseHandler.send(res)
		}
		let user = await Methods.select('*','Accounts',`accountnumber = '${id}'`)
		if(!user['0']){
			responseHandler.error(404,new Error('Account Not Found'))
			return responseHandler.send(res)
		}

		let Acc = await Methods.delete('accounts',`accountnumber='${id}'`);
		responseHandler.successful(200,'Account successfully deleted')
		return responseHandler.send(res)

  	} 
}
