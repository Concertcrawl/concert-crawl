import {Request, Response} from 'express'

import {Status} from "../../utils/interfaces/Status";
import {User} from "../../utils/interfaces/User";
import {SavedConcert} from "../../utils/interfaces/SavedConcert";
import {removeSavedConcert} from "../../utils/concert/removeSavedConcert";
import {saveConcert} from "../../utils/concert/saveConcert";
import {selectConcert} from "../../utils/concert/selectConcert";
import {validationResult} from "express-validator";


export async function toggleSavedConcert(request: Request,response: Response) {

    try{
        validationResult(request).throw()
        const {userConcertsConcertId} = request.body
        const user: User = request.session?.profile
        const userConcertsUserId = <string>user.userId
        let message: string

        const savedConcert: SavedConcert = {
            userConcertsUserId,
            userConcertsConcertId
        }

        const select = await selectConcert(savedConcert)


        // @ts-ignore
        if (select[0]){
            const result = await removeSavedConcert(savedConcert)
            message = 'Concert removed successfully.'
        }else{
            const result = await saveConcert(savedConcert)
            message = 'Concert added successfully.'
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
