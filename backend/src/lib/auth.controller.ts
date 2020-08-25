import passport from 'passport';
import passportLocal, { Strategy } from 'passport-local';
import { getUserByUserEmail} from "./getUserByUserEmail";
import {User} from "../../utils/interfaces/User";

const LocalStrategy = passportLocal.Strategy;

const passportStrategy : Strategy = new LocalStrategy(
    {
        usernameField: 'userEmail',
        passwordField: "userPassword"
    },
    async (email, password, done) => {
        try {
            const user : User | undefined = await getUserByUserEmail(email);
            return user ? done(null, user) : done(undefined, undefined, { message: 'Incorrect username or password'});
        }
        catch (error) {
            return done(error);
        }
    });

export const passportMiddleware = passport.use(passportStrategy);
