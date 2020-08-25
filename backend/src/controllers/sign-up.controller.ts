import {Request, Response} from 'express';
import {setActivationToken, setHash} from '../../utils/auth.utils';
import {User} from "../../utils/interfaces/User";
import {Status} from "../../utils/interfaces/Status";
import MailComposer from "nodemailer/lib/mail-composer";
import { insertUser } from "../../utils/user/insertUser";

const mailgun = require("mailgun-js")


export async function signupUserController(request: Request, response: Response) {
    try {

        const {userFirstName, userLastName, userProfileName, userEmail, userPassword, userZip} = request.body;
        const userHash = await setHash(userPassword);
        const userActivationToken = setActivationToken();
        const basePath = `${request.protocol}://${request.get('host')}${request.originalUrl}activation/${userActivationToken}`
        console.log(userActivationToken)

        const message = `<h2>Welcome to ConcertCrawl.</h2>
                        <p>If you want to start favoriting bands and saving concerts you need to verify your email! Just click the link below!</p>
                        <p><a href="${basePath}">${basePath}</a></p>
                        `

        const mailgunMessage = {
            from: `Mailbox Sandbox <postmaster@${process.env.MAILGUN_DOMAIN}`,
            to: userEmail,
            subject: "Welcome to ConcertCrawl! Please validate your email!",
            text: "What does this button do?",
            html: message
        }

        const user: User = {
            userId: null,
            userFirstName,
            userLastName,
            userProfileName,
            userEmail,
            userHash,
            userActivationToken,
            userZip
        }

        const result = await insertUser(user)

        const emailComposer: MailComposer = new MailComposer(mailgunMessage)

        emailComposer.compile().build((error: any, message: Buffer) => {
            const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

            console.log(message.toString("ascii"))
            const compiledEmail = {
                to: userEmail,
                message: message.toString("ascii")
            }

            const status: Status = {
                status: 200,
                message: "Profile successfully created please check your email.",
                data: null
            };

            mg.messages().sendMime(compiledEmail, (sendError: any, body: any) => {
                if (sendError) {
                    console.log(sendError);
                    return;
                }
                return response.json(status);
            });
        })
    } catch (error) {
        const status: Status = {
            status: 400,
            message: error.message,
            data: null
        }
    }

    return response.json(status)
}