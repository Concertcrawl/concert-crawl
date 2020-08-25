import {connect} from "../../src/database";
import {SavedConcert} from "../interfaces/SavedConcert";

export async function removeSavedConcert(savedConcert: SavedConcert) {
    try{
        const mySqlConnection = await connect();
        const mySqlQuery = "DELETE FROM userConcerts WHERE userConcertsUserId = UUID_TO_BIN(:userConcertsUserId) AND userConcertsConcertId = UUID_TO_BIN(:userConcertsConcertId)"
        const [rows] = await mySqlConnection.execute(mySqlQuery, savedConcert)
        return 'Concert removed successfully.'
    } catch(error) {
        console.log(error)
    }
}
