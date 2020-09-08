import {Request, Response} from "express";
import {User} from "../../utils/interfaces/User";
import {updateUserFirstName} from "../../utils/profile/updateUserFirstName";
import {updateUserPassword} from "../../utils/profile/updateUserPassword";
import {updateUserZip} from "../../utils/profile/updateZip";
import {SetUserName, SetPassword, SetZip} from "../../utils/interfaces/Settings";
import {generateJwt, setHash, validatePassword} from "../../utils/auth.utils";
import uuid from "uuid";

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
    const {userPassword, currentEnteredPass} = request.body
    const userHash = await setHash(userPassword)
    const user: User = request.session?.profile
    const userId = <string>user.userId

    const setPassword: SetPassword = {
        userId,
        userHash
    }

    if (await validatePassword(user.userHash, currentEnteredPass)) {
        try {
            await updateUserPassword(setPassword)
            return response.json({
                status: 200,
                data: null,
                message: "Password update was successful."
            })
        } catch (error) {
            return response.json({status: 400, data: null, message: "Password update failed."})
        }
    } else {
        return response.json({status: 400, data: null, message: "Wrong current password."})
    }

}

export async function updateZip(request: Request, response: Response) {
    const {userZip} = request.body
    const user: User = request.session?.profile
    const userId = <string>user.userId
    const userEmail = <string>user.userEmail

    const setZip: SetZip = {
        userId,
        userZip
    }

    try {
        await updateUserZip(setZip)
        const signature: string = uuid();
        const authorization: string = generateJwt({userId, userZip, userEmail}, signature);
        response.header({
            authorization
        });

        if (request.session) {
            request.session.profile.userZip = userZip;
            request.session.jwt = authorization;
            request.session.signature = signature;
        }
        return response.json({
            status: 200,
            data: null,
            message: "Zip code update was successful."
        })
    } catch (error) {
        return response.json({status: 400, data: null, message: "Zip code update failed."})
    }

}

