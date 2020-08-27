import {connect} from "../../src/database";
import {User} from "../interfaces/User";


export async function selectUserFavoritedBands(userId: string) {
    try {
        const mysqlConnection = await connect();

        const [rows] = await mysqlConnection.execute('SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertImage, concert.concertAddress, concert.concertZip, concert.concertTicketUrl, band.bandName, concertBands.concertBandsIsHeadliner, band.bandGenre, band.bandDescription, band.bandImage FROM band INNER JOIN userFavorites ON band.bandId = userFavorites.userFavoritesBandId INNER JOIN concertBands ON band.bandId = concertBands.concertBandsBandId INNER JOIN concert ON concert.concertId = concertBands.concertBandsConcertId WHERE userFavorites.userFavoritesUserId = uuid_to_bin(:userId)',{userId});
        console.log(userId)
        console.log(rows)

        return rows

    } catch (e) {
        console.error(e)
        console.log(userId)
    }
}