import {connect} from "../../src/database";
import {SetZip} from "../interfaces/Settings";

export async function updateUserZip(setZip: SetZip) {
    try {
        const mysqlConnection = await connect();
        const query : string = 'UPDATE user SET userZip = :userZip WHERE userId = UUID_TO_BIN(:userId)';
        const [rows] = await mysqlConnection.execute(query, setZip);
        return 'Profile is successfully updated'
    } catch (e) {
        console.error(e)
        return null
    }
}