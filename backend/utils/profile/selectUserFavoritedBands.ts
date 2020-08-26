import {connect} from "../../src/database";
import {User} from "../interfaces/User";


export async function selectUserFavoritedBands(userFavoritedBands: string) {
    try {
        const mysqlConnection = await connect();

        const [rows] = await mysqlConnection.execute('SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertImage, concert.concertAddress, concert.concertZip, concert.concertTicketUrl, band.bandName, concertBands.concertBandsIsHeadliner, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE user.userId = userFavorites.userFavoritesUserId;',
            {userFavoritedBands});

        // @ts-ignore is required because rows need to be interacted with as an array
        return rows.length !== 0 ? {...rows[0]}
            : undefined;

    } catch (e) {
        console.error(e)
        return undefined
    }
}