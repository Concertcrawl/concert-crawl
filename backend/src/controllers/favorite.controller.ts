import {Request, Response} from "express";
import {User} from "../../utils/interfaces/User";
import {selectUserFavoritedBands} from "../../utils/profile/selectUserFavoritedBands";
import {Status} from "../../utils/interfaces/Status";

export async function selectUserFavorites(request: Request, response: Response) {
    try{
        const user: User = request.session?.profile
        const userId = <string>user.userId
        const select = await selectUserFavoritedBands(userId)
        const status:Status = {
            status:200,
            message:"User Favorites selected successfully.",
            data:select
        }
        return response.json(status)

    } catch(error){
        console.log(error)
        const status:Status = {
            status:400,
            message:"User Favorites not selected.",
            data:null
        }
        return response.json(status)
    }
}