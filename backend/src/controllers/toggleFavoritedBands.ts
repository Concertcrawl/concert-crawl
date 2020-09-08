import {Request, Response} from "express";
import {User} from "../../utils/interfaces/User";
import {Status} from "../../utils/interfaces/Status";
import {FavoriteBand} from "../../utils/interfaces/FavoriteBand";
import {selectBand} from "../../utils/favorite/selectBand";
import {saveBand} from "../../utils/favorite/saveBand"
import {removeFavoritedBand} from "../../utils/favorite/removeFavoritedBand";


export async function toggleFavoritedBands(request: Request,response: Response) {

    try{
        const {userFavoritesBandId} = request.body
        const user: User = request.session?.profile
        const userFavoritesUserId = <string>user.userId
        let message: string;
        const favoritedBand: FavoriteBand = {
            userFavoritesUserId,
            userFavoritesBandId
        }

        const select = await selectBand(favoritedBand)


        // @ts-ignore ts does not know select is an array yet
        if (select[0]){
            const result = await removeFavoritedBand(favoritedBand)
            message='Band removed successfully.'
        }else{
            const result = await saveBand(favoritedBand)
            message='Band added successfully.'
        }

        const status: Status = {
            status: 200,
            message: message,
            data: null
        };
        return response.json(status)
    }catch (error){
        console.log(error)
    }
}
