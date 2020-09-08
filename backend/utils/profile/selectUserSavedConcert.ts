import {connect} from "../../src/database";
import {User} from "../interfaces/User";


export async function selectUserSavedConcerts(userId: string) {
    try {
        const mySqlConnection = await connect();
        const [rows] = await mySqlConnection.execute("SELECT BIN_TO_UUID(concert.concertId)as concertId, concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertImage, concert.concertAddress, concert.concertZip, concert.concertTicketUrl, band.bandName, concertBands.concertBandsIsHeadliner, BIN_TO_UUID(band.bandId) as bandId, band.bandGenre, band.bandDescription, band.bandImage FROM concert INNER JOIN userConcerts ON concert.concertId = userConcerts.userConcertsConcertId INNER JOIN concertBands ON concert.concertId = concertBands.concertBandsConcertId INNER JOIN band ON band.bandId = concertBands.concertBandsBandId WHERE concertBands.concertBandsIsHeadliner = 1 AND userConcerts.userConcertsUserId = UUID_TO_BIN(:userId) ORDER BY concert.concertDate",{userId})
        mySqlConnection.end()
        return rows

    }
    catch (e) {
        console.error(e)
    }
}