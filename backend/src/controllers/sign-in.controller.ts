import {NextFunction, Request, Response} from 'express';
import "express-session";
import passport from 'passport';
import passportLocal, {Strategy} from 'passport-local';

import uuid from "uuid";
import {generateJwt, validatePassword} from "../../utils/auth.utils";
import {User} from "../../utils/interfaces/User";
import {selectUserByUserEmail} from "../../utils/profile/selectUserByUserEmail";

export async function signInController(request: Request, response: Response, nextFunction: NextFunction) {
    try {
        const {userPassword} = request.body;
        passport.authenticate(
            'local',
            {session: false},
            async (err: any, passportUser: User) => {
                const {userId, userEmail} = passportUser;
                const signature: string = uuid();
                const authorization: string = generateJwt({userId, userEmail}, signature);


                const signInFailed = (message: string) => response.json({
                    status: 400,
                    data: null,
                    message
                });

                const signInSuccessful = () => {

                    // Commented out for testing purposes
                    // if(passport.User.profileActivationToken !== null) {
                    //    signInFailed("Please activate your account.")
                    //}

                    if (request.session) {
                        request.session.profile = passportUser;
                        request.session.jwt = authorization;
                        request.session.signature = signature;
                    }

                    response.header({
                        authorization
                    });

                    return response.json({status: 200, data: null, message: "Sign in successful."})
                };
                //@ts-ignore
                const isPasswordValid: boolean = passportUser && await validatePassword(passportUser.userHash, userPassword);

                return isPasswordValid ? signInSuccessful() : signInFailed("Invalid email or password");

            })(request, response, nextFunction)
    } catch (error) {
        return response.json({status: 500, data: null, message: error.message})
    }
}


const LocalStrategy = passportLocal.Strategy;

const passportStrategy: Strategy = new LocalStrategy(
    {
        usernameField: 'userEmail',
        passwordField: "userPassword"
    },
    async (email, password, done) => {
        try {

          const profile: User | undefined = await selectUserByUserEmail
          (email);

          return profile ? done(null, profile) : done(undefined, undefined,
              {message: 'Incorrect username or password'});
      } catch (error) {
          return done(error);
      }
  });

export const passportMiddleware = passport.use(passportStrategy);