import { connect } from '../database';
import {User} from "../../utils/interfaces/User";

export async function getUserByUserEmail (userEmail: string) : Promise<User|undefined> {

    const mysqlConnection = await connect();

    const [rows] = await mysqlConnection.execute('SELECT BIN_TO_UUID(userId) as userId, userActivationToken, userProfileName, userFirstName, userLastName, userHash, userZip FROM user WHERE userEmail = :userEmail', {userEmail});
    // @ts-ignore is required so that rows can be interacted with like the array it is
    return rows.length !== 0 ? {...rows[0]} : undefined;
}
