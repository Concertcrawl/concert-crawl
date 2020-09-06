import {connect} from "../../src/database";

export async function selectBandConcertId(concertId: string) {
    try {
        const mySqlConnection = await connect();
        const [rows] = await mySqlConnection.execute("SELECT BIN_TO_UUID(band.bandId) as bandId, BIN_TO_UUID(concertBands.concertBandsConcertId) as concertId, band.bandName, CAST(concertBands.concertBandsIsHeadliner AS UNSIGNED) AS isHeadliner, band.bandGenre, band.bandImage FROM band INNER JOIN concertBands ON band.bandId = concertBands.concertBandsBandId WHERE concertBands.concertBandsConcertId = UUID_TO_BIN(:concertId) LIMIT 5",{concertId})
        mySqlConnection.end()
        return rows

    }
    catch (e) {
        console.error(e)
    }
}