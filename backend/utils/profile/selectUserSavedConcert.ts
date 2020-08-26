import {connect} from "../../src/database";
import {User} from "../interfaces/User";


export async function selectUserSavedConcerts(userId: string) {
    try {
        const mySqlConnection = await connect();

        const [rows] = await mySqlConnection.execute("SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertImage, concert.concertAddress, concert.concertZip, concert.concertTicketUrl, band.bandName, concertBands.concertBandsIsHeadliner, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE userConcerts.userConcertsUserId = :userId",[userId]
    )

        return rows

    }
    catch (e) {
        console.error(e)
    }
}