import {connect} from "../../src/database";
import {SavedConcert} from "../interfaces/SavedConcert";

export async function selectConcert(savedConcert: SavedConcert) {
    try{
        const mySqlConnection = await connect();
        const mySqlQuery = "SELECT BIN_TO_UUID(userConcertsUserId) AS userConcertsUserId, BIN_TO_UUID(userConcertsConcertId) AS userConcertsConcertId FROM userConcerts WHERE userConcertsUserId = UUID_TO_BIN(:userConcertsUserId) AND userConcertsConcertId = UUID_TO_BIN(:userConcertsConcertId)"
        const [rows] = await mySqlConnection.execute(mySqlQuery, savedConcert)
        return rows
    } catch(error) {
        console.log(error)
    }
}
