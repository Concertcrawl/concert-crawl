import {User} from "../interfaces/User";
import {connect} from "../../src/database";

export async function insertUser(user: User) {
    try {
        const mySqlConnection = await connect();
        const query: string = 'INSERT INTO user(userId, userFirstName, userLastName, userProfileName, userEmail, userHash, userActivationToken, userZip) VALUES (UUID_TO_BIN(UUID()), :userFirstName, :userLastName, :userProfileName, :userEmail, :userHash, :userActivationToken, :userZip)'

        const [rows] = await mySqlConnection.execute(query, user)
        return 'Profile Created!'
    } catch(error) {
        console.log(error)
        return null
    }
}