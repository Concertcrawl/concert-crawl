import {NextFunction, Request, Response} from 'express';
import {JsonWebTokenError, TokenExpiredError, verify, } from "jsonwebtoken";
import {Status} from "../../utils/interfaces/Status";
import {User} from "../../utils/interfaces/User";



export function isLoggedIn(request: Request, response: Response, next: NextFunction): any {

    let status : Status = {status: 400, message: "Please login", data: null};

    const sessionProfile  = (request : Request): User | undefined => request.session?.profile ?? undefined;

    const signature = (request : Request) : string => request.session?.signature ?? "no signature"

    const isSessionActive = (isProfileActive: User| undefined) : boolean => isProfileActive ? true : false;


    const getJwtTokenFromHeader  = (headers: any): string => {
        return headers["authorization"];
    };
    const unverifiedJwtToken: string = getJwtTokenFromHeader(request.headers);

    const isJwtValid: any = unverifiedJwtToken
        ? verify(
            unverifiedJwtToken,
            signature(request),
            {maxAge: "3hr"},
            (error: any, decoded: any) => error ? false : true
        )
        : false;

    return isJwtValid && isSessionActive(sessionProfile(request)) ? next() : response.json(status);
}


