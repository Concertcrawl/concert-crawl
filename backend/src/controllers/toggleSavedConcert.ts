import {Request, Response} from 'express'

import {Status} from "../../utils/interfaces/Status";
import {User} from "../../utils/interfaces/User";
import {SavedConcert} from "../../utils/interfaces/SavedConcert";
import {removeSavedConcert} from "../../utils/concert/removeSavedConcert";
import {saveConcert} from "../../utils/concert/saveConcert";
import {selectConcert} from "../../utils/concert/selectConcert";


export async function toggleSavedConcert(request: Request,response: Response) {

    try{
        console.log(request.body)
        const {userConcertsConcertId} = request.body
        const user: User = request.session?.profile
        const userConcertsUserId = <string>user.userId

        const savedConcert: SavedConcert = {
            userConcertsUserId,
            userConcertsConcertId
        }

        const select = await selectConcert(savedConcert)


        // @ts-ignore
        if (select[0]){
            const result = await removeSavedConcert(savedConcert)
        }else{
            const result = await saveConcert(savedConcert)
        }

        const status: Status = {
            status: 200,
            message: 'Concert successfully added.',
            data: null
        };
        return response.json(status)
    }catch (error){
        console.log(error)
    }
}
