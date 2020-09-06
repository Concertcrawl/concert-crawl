import {connect} from "../../src/database";
import {Search} from "../interfaces/Search";


export async function executeSearch(search: Search) {

    const mySqlConnection = await connect()
    let params = []
    const {name, genre, lat, long, sDate, eDate, page} = search;

    let sql = "SELECT BIN_TO_UUID(concert.concertId) AS concertId, concert.concertName, ( 3959 * acos ( cos ( radians(?) ) * cos( radians( concertLat ) ) * cos( radians( concertLong ) - radians(?) ) + sin ( radians(?) ) * sin( radians( concertLat ) ) ) ) AS distance, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertImage, concert.concertAddress, concert.concertZip, concert.concertTicketUrl, BIN_TO_UUID(band.bandId) AS bandId, band.bandName, CAST(concertBands.concertBandsIsHeadliner AS UNSIGNED) AS isHeadliner, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE concertBandsIsHeadliner = 1";
    let countSql = "SELECT CEIL(COUNT(*) / 20) AS count FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE concertBandsIsHeadliner = 1";

    params.push(lat)
    params.push(long)
    params.push(lat)

    if (name != undefined) {
        sql += " AND concert.concertName LIKE ?"
        countSql += " AND concert.concertName LIKE ?"
        params.push("%"+name+"%")
        console.log("Concert pushed.")
    }
    if (genre != undefined) {
        sql += ' AND band.bandGenre = ?'
        countSql += ' AND band.bandGenre = ?'
        params.push(genre)
        console.log("Genre pushed.")
    }
    if (sDate != undefined) {
        sql += ' AND concert.concertDate >= ?'
        countSql += ' AND concert.concertDate >= ?'
        params.push(sDate)
        console.log("sDate pushed.")
    }
    if (eDate != undefined) {
        sql += ' AND concert.concertDate <= ?'
        countSql += ' AND concert.concertDate <= ?'
        params.push(eDate)
        console.log("eDate pushed") }

    sql += ' ORDER BY distance ASC LIMIT ? OFFSET ?'



    let [pages] = await mySqlConnection.query(countSql, params)
    params.push(20)
    params.push((page-1)*20)
    let [results] = await mySqlConnection.execute(sql, params)
    mySqlConnection.end()
    // @ts-ignore
    return {results, pages};
}