import {connect} from "../../src/database";
import {Profile} from "../interfaces/Profile";

export async function selectUserByUserActivationToken(userActivationToken: string) {
    try {
        const mysqlConnection = await connect();

        const [rows] = await mysqlConnection.execute('SELECT BIN_TO_UUID(userId) as userId, userFirstName, userLastName, userProfileName, userEmail, userHashedPassword, userZip FROM user WHERE userActivationToken = :userActivationToken',
            {userActivationToken});
            console.log(rows)

        // @ts-ignore is required because rows need to be interacted with as an array
        return rows.length !== 0 ? {...rows[0]}
: undefined;

    } catch (e) {
        console.error(e)
        return undefined
    }
}