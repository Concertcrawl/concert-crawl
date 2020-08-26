import {Request, Response} from "express";
import {User} from "../../utils/interfaces/User";
import {updateUserFirstName} from "../../utils/profile/updateUserFirstName";
import {SetUserName, SetPassword} from "../../utils/interfaces/Settings";
import {setHash} from "../../utils/auth.utils";

export async function updateFirstName(request: Request, response: Response) {
    const {userFirstName} = request.body
    const user: User = request.session?.profile
    const userId = <string>user.userId

    const setUserName: SetUserName = {
        userId,
        userFirstName
    }

    try {
        await updateUserFirstName(setUserName)
        return response.json({
            status: 200,
            data: null,
            message: "First name update was successful."
        })
    } catch (error) {
        return response.json({status: 400, data: null, message: "First name update failed."})
    }

}

export async function updatePassword(request: Request, response: Response) {
    const {userPassword} = request.body
    const userHash = await setHash(userPassword)
    const user: User = request.session?.profile
    const userId = <string>user.userId

    const setPassword: SetPassword = {
        userId,
        userHash
    }

    try {
        await updateUserPassword(setPassword)
        return response.json({
            status: 200,
            data: null,
            message: "First name update was successful."
        })
    } catch (error) {
        return response.json({status: 400, data: null, message: "First name update failed."})
    }

}

