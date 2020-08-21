import {connect} from "../../src/database";

export async function executeSearch() {

    const mySqlConnection = await connect()

    // console.log(request.params)
    // const {band, genre, location, sDate, eDate} = request.params
    // const params = [];
    // console.log(band, genre, location, sDate, eDate)
    //
    // let sql = "SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE true";
    //
    // if (band !== '' || undefined) {
    //     sql += 'AND band.bandName = ? '
    //     params.push(band)
    // }
    // if (band !== '' || undefined) {
    //     sql += 'AND band.bandGenre = ? '
    //     params.push(genre)
    // }
    // if (band !== '' || undefined) {
    //     sql += 'AND concert.concertZip = ? '
    //     params.push(location)
    // }
    // if (band !== '' || undefined) {
    //     sql += 'AND concert.date >= ? '
    //     params.push(sDate)
    // }
    // if (band !== '' || undefined) {
    //     sql += 'AND concert.date <= ? '
    //     params.push(eDate)
    // }
    // console.log(sql)
    //
    let [results] = await mySqlConnection.execute('SELECT * FROM `band` WHERE `bandGenre` = ?', ["Test Genre"])
    console.log(results)
    return "Does this work?";
}