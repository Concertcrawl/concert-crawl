import {User} from "../interfaces/User";
import {connect} from "../../src/database";

export async function updateUser(user: User) {
    try {
        const mysqlConnection = await connect();
        const query : string = 'UPDATE user SET userActivationToken = :userActivationToken, userFirstName = :userFirstName, userLastName = :userLastName, userEmail = :userEmail, userHash= :userHash, userZip = :userZip WHERE userId = UUID_TO_BIN (:userId)';

        const [rows] = await mysqlConnection.execute(query, user);
        return 'Profile is successfully updated'
    } catch (e) {
        console.error(e)
        return null
    }
}