import {User} from "../interfaces/User";
import {connect} from "../../src/database";

export async function insertUser(user: User) {
    try {
        const mySqlConnection = await connect();
        const query :: string = 'INSERT INTO profile(userId)'
    } catch(error) {
        console.log(error)
        return null
    }
}