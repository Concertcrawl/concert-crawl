import {connect} from "../../src/database";
import {FavoriteBand} from "../interfaces/FavoriteBand";

export async function favoriteBand (favoriteBand: FavoriteBand) {
    try{
        const mySqlConnection = await connect();
        const mySqlQuery = "INSERT INTO userFavorites(userFavoritesUserId, userFavoritesBandId) VALUES(UUID_TO_BIN(:userFavoritesUserId), UUID_TO_BIN(:userFavoritesBandId))"
        const [rows] = await mySqlConnection.execute(mySqlQuery, favoriteBand)
        return 'Band saved successfully'
    } catch (error) {
        console.log(error)
    }
}