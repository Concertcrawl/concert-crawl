import {connect} from "../../src/database";
import {Search} from "../interfaces/Search";


export async function executeSearch(search: Search) {

    const mySqlConnection = await connect()
    let params = []
    const {name, genre, lat, long, sDate, eDate, page} = search;

    let sql = "SELECT BIN_TO_UUID(concert.concertId) AS concertId, concert.concertName, ( 3959 * acos ( cos ( radians(?) ) * cos( radians( concertLat ) ) * cos( radians( concertLong ) - radians(?) ) + sin ( radians(?) ) * sin( radians( concertLat ) ) ) ) AS distance, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertImage, concert.concertAddress, concert.concertZip, concert.concertTicketUrl, BIN_TO_UUID(band.bandId) AS bandId, band.bandName, CAST(concertBands.concertBandsIsHeadliner AS UNSIGNED) AS isHeadliner, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE concertBandsIsHeadliner = 1";
    let countSql = "SELECT CEIL(COUNT(*) / 20) AS count FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE concertBandsIsHeadliner = 1";


    if (name != undefined) {
        sql += " AND band.bandName LIKE ?"
        countSql += " AND band.bandName LIKE ?"
        params.push("%"+name+"%")
    }
    if (genre != undefined) {
        sql += ' AND band.bandGenre = ?'
        countSql += ' AND band.bandGenre = ?'
        params.push(genre)
    }
    if (sDate != undefined) {
        sql += ' AND concert.concertDate >= ?'
        countSql += ' AND concert.concertDate >= ?'
        params.push(sDate)
    }
    if (eDate != undefined) {
        sql += ' AND concert.concertDate <= ?'
        countSql += ' AND concert.concertDate <= ?'
        params.push(eDate)}

    sql += ' ORDER BY distance, concertDate ASC LIMIT ? OFFSET ?'

    let [pages] = await mySqlConnection.query(countSql, params)
    params.unshift(lat)
    params.unshift(long)
    params.unshift(lat)
    params.push(20)
    params.push((page-1)*20)
    let [results] = await mySqlConnection.execute(sql, params)
    mySqlConnection.end()
    return {results, pages};
}