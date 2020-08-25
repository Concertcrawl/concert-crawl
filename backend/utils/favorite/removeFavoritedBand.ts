import {connect} from "../../src/database";
import {FavoriteBand} from "../interfaces/FavoriteBand";

export async function removeFavoritedBand(favoriteBand: FavoriteBand) {
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = "DELETE FROM userFavorites WHERE userFavoritesUserId = UUID_TO_BIN(:userFavoritesUserId) AND userFavoritesBandId = UUID_TO_BIN(:userFavoritesBandId)"
        const [rows] = await mySqlConnection.execute(mySqlQuery, favoriteBand)
        return 'Band removed successfully.'
    } catch (error) {
        console.log(error)
    }
}
