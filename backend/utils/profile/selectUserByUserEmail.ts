
import {connect} from "../../src/database";
import {User} from "../interfaces/User";

export async function selectUserByUserEmail(userEmail: string) {
    try {
        const mysqlConnection = await connect();

        const [rows] = await mysqlConnection.execute('SELECT BIN_TO_UUID(userId) as userId, userActivationToken, userProfileName, userEmail, userHash, userFirstName, userLastName, userZip FROM user WHERE userEmail = :userEmail', {userEmail});
        // @ts-ignore is required, ts does not know that rows is an array yet.
        return rows.length !== 0 ? {...rows[0]} : undefined;
    } catch (e) {
        console.error(e)
        return undefined
    }
}