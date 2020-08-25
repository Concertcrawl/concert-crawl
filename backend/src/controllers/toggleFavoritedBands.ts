import {Request, Response} from "express";
import {User} from "../../utils/interfaces/User";
import {Status} from "../../utils/interfaces/Status";
import {FavoriteBand} from "../../utils/interfaces/FavoriteBand";
import {selectBand} from "../../utils/favorite/selectBand";
import {saveBand} from "../../utils/favorite/saveBand"
import {removeFavoritedBand} from "../../utils/favorite/removeFavoritedBand";


export async function toggleFavoritedBands(request: Request,response: Response) {

    try{
        console.log(request.body)
        const {userFavoritesBandId} = request.body
        const user: User = request.session?.profile
        const userFavoritesUserId = <string>user.userId

        const favoritedBand: FavoriteBand = {
            userFavoritesUserId,
            userFavoritesBandId
        }

        const select = await selectBand(favoritedBand)


        // @ts-ignore
        if (select[0]){
            const result = await removeFavoritedBand(favoritedBand)
        }else{
            const result = await saveBand(favoritedBand)
        }

        const status: Status = {
            status: 200,
            message: 'Band successfully added.',
            data: null
        };
        return response.json(status)
    }catch (error){
        console.log(error)
    }
}
