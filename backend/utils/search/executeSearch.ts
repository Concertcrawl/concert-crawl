import {connect} from "../../src/database";

export async function executeSearch(test: any) {

    const mySqlConnection = await connect()
    console.log(test)

    const params = [];
    console.log(test.band, test.genre, test.location, test.sDate, test.eDate)

    // let sql = "SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE 1 = 1";
    let sql = "SELECT * FROM band WHERE true"

    if (test.band != undefined) {
        sql += ' AND band.bandName = ?'
        params.push(test.band)
        console.log("Band pushed.")
    }
    if (test.genre != undefined) {
        sql += ' AND band.bandGenre = ?'
        params.push(test.genre)
        console.log("Genre pushed.")
    }
    if (test.location != undefined) {
        sql += ' AND concert.concertZip = ?'
        params.push(test.location)
        console.log("Location pushed.")
    }
    if (test.sDate != undefined) {
        sql += ' AND concert.date >= ?'
        params.push(test.sDate)
        console.log("sDate pushed.")
    }
    if (test.eDate != undefined) {
        sql += ' AND concert.date <= ?'
        params.push(test.eDate)
        console.log("eDate pushed")
    }
    console.log(params)
    console.log(sql)

    let [results] = await mySqlConnection.execute(sql, params)
    console.log(results)
    return results;
}