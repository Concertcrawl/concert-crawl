import {User} from "../interfaces/User";
import {connect} from "../../src/database";
import {Status} from "../interfaces/Status";

export async function insertUser(user: User) {
    try {
        const mySqlConnection = await connect();
        const query: string = 'INSERT INTO user(userId, userFirstName, userLastName, userProfileName, userEmail, userHash, userActivationToken, userZip) VALUES (UUID_TO_BIN(UUID()), :userFirstName, :userLastName, :userProfileName, :userEmail, :userHash, :userActivationToken, :userZip)'

        const [rows] = await mySqlConnection.execute(query, user)
    } catch(error) {
        const status: Status = {
            status: 400,
            message: error.message,
            data: null
        }
        if (error.message.includes("userProfileName")) {
            status.message = "Username already exists."
        } else if (error.message.includes("userEmail")) {
            status.message = "Email already in use."
        }
        return status
    }
}