import {connect} from "../../src/database";
import {FavoriteBand} from "../interfaces/FavoriteBand";

export async function selectBand(favoriteBand: FavoriteBand) {
    try{
        const mySqlConnection = await connect();
        const mySqlQuery = "SELECT BIN_TO_UUID(userFavoritesUserId) AS userFavoritesUserId, BIN_TO_UUID(userFavoritesBandId) AS userFavoritesBandId FROM userFavorites WHERE userFavoritesUserId = UUID_TO_BIN(:userFavoritesUserId) AND userFavoritesBandId = UUID_TO_BIN(:userFavoritesBandId)"
        const [rows] = await mySqlConnection.execute(mySqlQuery, favoriteBand)
        mySqlConnection.end()
        return rows
    } catch(error) {
        console.log(error)
    }
}
