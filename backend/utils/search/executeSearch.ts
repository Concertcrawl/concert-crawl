import {connect} from "../../src/database";
import {Search} from "../interfaces/Search";


export async function executeSearch(search: Search) {

    const mySqlConnection = await connect()
    console.log(search)
    let params = []
    const {name, genre, location, sDate, eDate, venue} = search;

    let sql = "SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertImage, concert.concertAddress, concert.concertZip, concert.concertTicketUrl, band.bandName, CAST(concertBands.concertBandsIsHeadliner AS UNSIGNED) AS isHeadliner, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE 1 = 1";


    if (name != undefined) {
        sql += " AND concert.concertName LIKE ?"
        params.push("%"+name+"%")
        console.log("Concert pushed.")
    }
    if (genre != undefined) {
        sql += ' AND band.bandGenre = ?'
        params.push(genre)
        console.log("Genre pushed.")
    }
    if (location != undefined) {
        sql += ' AND concert.concertZip = ?'
        params.push(location)
        console.log("Location pushed.")
    }
    if (sDate != undefined) {
        sql += ' AND concert.concertDate >= ?'
        params.push(sDate)
        console.log("sDate pushed.")
    }
    if (eDate != undefined) {
        sql += ' AND concert.concertDate <= ?'
        params.push(eDate)
        console.log("eDate pushed")
    }
    if (venue != undefined) {
        sql += " AND concert.concertVenueName LIKE ?"
        params.push("%"+venue+"%")
        console.log("Venue pushed.")
    }
    let [results] = await mySqlConnection.execute(sql, params)
    return results;
}