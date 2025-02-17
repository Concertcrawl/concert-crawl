import { Status } from '../../utils/interfaces/Status';
import {Request, Response} from "express";

export function signOutController(request: Request, response : Response) {
    let status : Status = {status: 200, message: "Sign out successful!", data: null};
    const {session}  = request;

    const executeSignOut = () => {
        // @ts-ignore: broken typing is requiring a callback function that is optional.
        session?.destroy()

    };

    const signOutFailed = () => {
        status.status = 400;
        status.message = "You are not signed in.";
    };

    session ? executeSignOut() : signOutFailed();

    return response.json(status)
}