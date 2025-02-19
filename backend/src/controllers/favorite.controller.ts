import {Request, Response} from "express";
import {User} from "../../utils/interfaces/User";
import {selectUserFavoritedBands} from "../../utils/profile/selectUserFavoritedBands";
import {Status} from "../../utils/interfaces/Status";
import {selectConcertBandId} from "../../utils/concert/selectConcertByBandId";
import {selectBandConcertId} from "../../utils/concert/selectBandByConcertId";

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

export async function selectConcertsByBand(request: Request, response: Response) {
    try {
        const {bandId} = request.params
        const concerts = await selectConcertBandId(bandId)
        const status:Status = {
            status:200,
            message:"Concerts selected successfully by bandId.",
            data:concerts
        }
        return response.json(status)
    } catch(error){
        const status:Status = {
            status:400,
            message:"Could not grab concerts.",
            data:null
        }
        return response.json(status)
    }
}

export async function selectBandsByConcert(request: Request, response: Response) {
    try {
        const {concertId} = request.params
        const bands = await selectBandConcertId(concertId)
        const status:Status = {
            status:200,
            message:"Bands selected successfully by concertId.",
            data:bands
        }
        return response.json(status)
    } catch(error){
        const status:Status = {
            status:400,
            message:"Could not grab bands.",
            data:null
        }
        return response.json(status)
    }
}