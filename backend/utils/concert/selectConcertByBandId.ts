import {connect} from "../../src/database";

export async function selectConcertBandId(bandId: string) {
    try {
        const mySqlConnection = await connect();
        console.log(bandId)
        const [rows] = await mySqlConnection.execute("SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertImage, concert.concertAddress, concert.concertZip, concert.concertTicketUrl, band.bandName, concertBands.concertBandsIsHeadliner, band.bandGenre, band.bandDescription, band.bandImage FROM concert INNER JOIN concertBands on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band ON band.bandId = concertBands.concertBandsBandId WHERE concertBands.concertBandsBandId = UUID_TO_BIN(:bandId)",{bandId})
        console.log(rows)
        return rows

    }
    catch (e) {
        console.error(e)
    }
}