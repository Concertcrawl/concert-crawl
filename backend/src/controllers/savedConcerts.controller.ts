import {Request, Response} from "express";
import {User} from "../../utils/interfaces/User";
import {selectUserSavedConcerts} from "../../utils/profile/selectUserSavedConcert";
import {Status} from "../../utils/interfaces/Status";

export async function viewUserSavedConcerts(request: Request, response: Response) {
    try{
        const user: User = request.session?.user
        const userId = <string>user.userId
        const select = await selectUserSavedConcerts(userId)
        const status:Status={
            status:200,
            message:"User Saved Concerts selected successfully.",
            data:select
        }
        return response.json(status)
    }
    catch(error){
        const status:Status = {
            status:400,
            message:"User Saved Concerts not selected.",
            data:null
        }
        return response.json(status)
    }
}