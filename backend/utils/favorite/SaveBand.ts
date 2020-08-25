import {connect} from "../../src/database";
import {FavoritedBand} from "../interfaces/Favorites";

export async function favoriteBand (favoritedBand: favoritedBand) {
    try{
        const mySqlConnection = await connect();
        const mySqlQuery = "SELECT BIN_TO_UUID(userFavoritesUserId) AS userFavoritesUserId, BIN_TO_UUID(userFavoritesFavoriteband"
        const [rows] = await mySqlConnection.execute(mySqlQuery, favoritedBand)
        return 'Band saved successfully'
    } catch (error) {
        console.log(error)
    }
}