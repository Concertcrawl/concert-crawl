import {User} from "../interfaces/User";
import {connect} from "../../src/database";
import {SetUserName} from "../interfaces/Settings";

export async function updateUserFirstName(setUserName: SetUserName) {
    try {
        const mysqlConnection = await connect();
        const query : string = 'UPDATE user SET userFirstName = :userFirstName WHERE userId = UUID_TO_BIN(:userId)';
        console.log(setUserName)
        const [rows] = await mysqlConnection.execute(query, setUserName);
        return 'Profile is successfully updated'
    } catch (e) {
        console.error(e)
        return null
    }
}