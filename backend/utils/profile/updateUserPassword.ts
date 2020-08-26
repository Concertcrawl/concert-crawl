import {connect} from "../../src/database";
import {SetPassword} from "../interfaces/Settings";

export async function updateUserPassword(setPassword: SetPassword) {
    try {
        const mysqlConnection = await connect();
        const query : string = 'UPDATE user SET userHash = :userHash WHERE userId = UUID_TO_BIN(:userId)';
        const [rows] = await mysqlConnection.execute(query, setPassword);
        return 'Profile is successfully updated'
    } catch (e) {
        console.error(e)
        return null
    }
}