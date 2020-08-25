import {connect} from "../../src/database";
import {SavedConcert} from "../interfaces/SavedConcert";

export async function saveConcert(savedConcert: SavedConcert) {
    try{
        const mySqlConnection = await connect();
        const mySqlQuery = "INSERT INTO userConcerts(userConcertsUserId, userConcertsConcertId) VALUES(UUID_TO_BIN(:userConcertsUserId), UUID_TO_BIN(:userConcertsConcertId))"
        const [rows] = await mySqlConnection.execute(mySqlQuery, savedConcert)
        return 'Concert saved successfully.'
    } catch(error) {
        console.log(error)
    }
}
