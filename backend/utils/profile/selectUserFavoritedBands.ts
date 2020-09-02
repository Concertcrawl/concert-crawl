import {connect} from "../../src/database";
import {User} from "../interfaces/User";


export async function selectUserFavoritedBands(userId: string) {
    try {
        const mysqlConnection = await connect();

        const [rows] = await mysqlConnection.execute('SELECT band.bandName, band.bandGenre, band.bandImage FROM band INNER JOIN userFavorites ON band.bandId = userFavorites.userFavoritesBandId WHERE userFavorites.userFavoritesUserId = uuid_to_bin(:userId)',{userId});
        console.log(userId)
        console.log(rows)

        return rows

    } catch (e) {
        console.error(e)
        console.log(userId)
    }
}