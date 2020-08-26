import {connect} from "../../src/database";
import {Search} from "../interfaces/Search";

export async function executeSearch(search: Search) {

    const mySqlConnection = await connect()

    let params = []
    const {name, genre, location, sDate, eDate} = search;

    let sql = "SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, concert.concertZip, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE 1 = 1";

    if (name != undefined) {
        sql += " AND concert.concertName LIKE ? OR band.bandName LIKE ?"
        params.push("%"+name+"%", "%"+name+"%")
        console.log("Concert pushed.")
    }
    if (genre != undefined) {
        sql += ' AND band.bandGenre = ?'
        params.push(genre)
        console.log("Genre pushed.")
    }
    if (location != undefined) {
        sql += ' AND concert.concertAddress LIKE ?'
        params.push("%"+location+"%")
        console.log("Location pushed.")
    }
    if (sDate != undefined) {
        sql += ' AND concert.date >= ?'
        params.push(sDate)
        console.log("sDate pushed.")
    }
    if (eDate != undefined) {
        sql += ' AND concert.date <= ?'
        params.push(eDate)
        console.log("eDate pushed")
    }
    let [results] = await mySqlConnection.execute(sql, params)
    return results;
}