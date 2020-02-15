import responseHandler from "../helpers/responseHandler";
import Methods from "../helpers/dbMethods";
 
export default class staffController {
  static async accounts(req,res){
	    let allAccounts ;
	    let  user = await Methods.select('*','users',`userid='${req.user.userid}'`);
	    if(!user['0'].isadmin&&user['0'].type!=="staff"){
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
}