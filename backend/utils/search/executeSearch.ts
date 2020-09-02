import {connect} from "../../src/database";
import {Search} from "../interfaces/Search";


export async function executeSearch(search: Search) {

    const mySqlConnection = await connect()
    let params = []
    const {name, genre, location, sDate, eDate, venue, page} = search;

    let sql = "SELECT BIN_TO_UUID(concert.concertId) AS concertId, concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertImage, concert.concertAddress, concert.concertZip, concert.concertTicketUrl, band.bandName, CAST(concertBands.concertBandsIsHeadliner AS UNSIGNED) AS isHeadliner, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE concertBandsIsHeadliner = 1";
    let countSql = "SELECT CEIL(COUNT(*) / 20) AS count FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE concertBandsIsHeadliner = 1";

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
    if (location != undefined) {
        sql += ' AND concert.concertZip = ?'
        countSql += ' AND concert.concertZip = ?'
        params.push(location)
        console.log("Location pushed.")
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
        console.log("eDate pushed")
    }
    if (venue != undefined) {
        sql += " AND concert.concertVenueName LIKE ?"
        countSql += " AND concert.concertVenueName LIKE ?"
        params.push("%"+venue+"%")
        console.log("Venue pushed.")
    }
    sql += ' ORDER BY concertDate ASC LIMIT ? OFFSET ?'



    let [pages] = await mySqlConnection.query(countSql, params)
    params.push(20)
    params.push((page-1)*20)
    let [results] = await mySqlConnection.execute(sql, params)
    // @ts-ignore
    console.log(pages)
    return {results, pages};
}