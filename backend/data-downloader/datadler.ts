import {connect} from "../src/database";

require('dotenv').config()

import {v4 as uuidv4} from 'uuid';


const axios = require('axios')

interface Post {
    concertUuid: string,
    concertName: string | null,
    concertGenre: number,
    concertDate: number,
    concertTime: number | null,
    concertVenue: string | null,
    concertAddress: string | null,
    concertZip: number | null,
    concertLat?: number | string,
    concertLong?: number | string,
    concertBands: string | Array<string>
}

function dataDownloader(): Promise<any> {
    return main()

    async function main() {
        try {
            await downloadPosts()

        } catch (e) {
            console.log(e)
        }
    }


    async function downloadPosts() {
        const url = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US`
        let maxPage = 0
        let states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
        for (let i = 0; i < states.length; i++) {
            let page = 0;
            do {
                try {
                    const {data} =
                        await axios.get(url, {
                            params: {
                                apikey: process.env.TICKETMASTER_API_KEY,
                                page: ++page,
                                classificationName: 'music',
                                size: 100,
                                stateCode: states[i]
                            }
                        })
                    const correctedData = data._embedded.events
                    if (data.page.totalPages > 9) {
                        maxPage = 9;
                    } else {
                        maxPage = data.page.totalPages
                    }
                    const mySqlConnection = await connect()
                    const createPosts = async (array: any[]) => {
                        const posts: Post[] = []
                        for (let currentPost of array) {
                            if (!currentPost.name.includes("Megaticket") && !currentPost.classifications[0].genre.name.includes('Theatre')) {
                                let post: Post = {
                                    concertUuid: uuidv4(),
                                    concertName: currentPost.name,
                                    concertGenre: currentPost.classifications[0].genre.name,
                                    concertDate: currentPost.dates.start.localDate,
                                    concertTime: currentPost.dates.start?.localTime ?? '00:00:000',
                                    concertVenue: currentPost._embedded.venues[0].name,
                                    concertAddress: currentPost._embedded.venues[0].address.line1 + ' ' + currentPost._embedded.venues[0].city.name + ' ' + currentPost._embedded.venues[0].state.stateCode,
                                    concertZip: currentPost._embedded.venues[0].postalCode,
                                    concertLat: currentPost._embedded.venues[0].location?.latitude ?? 123.1234,
                                    concertLong: currentPost._embedded.venues[0].location?.longitude ?? 123.1234,
                                    concertBands: currentPost._embedded?.attractions
                                }


                                // Declaring MySQL functions.
                                let insertBand = "INSERT INTO band(bandId, bandName, bandGenre) VALUES (UUID_TO_BIN(?), ?, ?)"
                                let insertConcertBand = "INSERT INTO concertBands(concertBandsConcertId, concertBandsBandId, concertBandsIsHeadliner) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?)"
                                let mySqlConcertQuery = "INSERT INTO concert(concertId, concertName, concertGenre, concertDate, concertTime, concertVenueName, concertAddress, concertZip, concertLat, concertLong) VALUES (UUID_TO_BIN(:concertUuid), :concertName, :concertGenre, :concertDate, :concertTime, :concertVenue, :concertAddress, :concertZip, :concertLat, :concertLong)"
                                let selectBandUuid = "SELECT BIN_TO_UUID(band.bandId) AS uuid FROM band WHERE band.bandName = ?"


                                try {
                                    await mySqlConnection.execute(mySqlConcertQuery, post)
                                } catch (error) {
                                    console.log(post)
                                }
                                for (let j = 0; j < post.concertBands.length; j++) {
                                    if (post.concertBands[j] == post.concertBands[0]) {
                                        let storedUuid = await mySqlConnection.execute(selectBandUuid, [currentPost._embedded?.attractions[0].name])
                                        console.log(storedUuid[0])

                                        // @ts-ignore
                                        if (storedUuid[0] == '') {
                                            let headLinerUuid = uuidv4()
                                            await mySqlConnection.execute(insertBand, [headLinerUuid, currentPost._embedded?.attractions[0].name, currentPost._embedded.attractions[0].classifications[0].genre.name])
                                            await mySqlConnection.execute(insertConcertBand, [post.concertUuid, headLinerUuid, 1])
                                        } else {
                                            // @ts-ignore
                                            await mySqlConnection.execute(insertConcertBand, [post.concertUuid, storedUuid[0][0].uuid, 1])
                                        }
                                    } else {
                                        let storedUuid = await mySqlConnection.execute(selectBandUuid, [currentPost._embedded?.attractions[j].name])
                                        console.log(storedUuid[0])
                                        // @ts-ignore
                                        if (storedUuid[0] == '') {
                                            let bandsUuid = uuidv4()
                                            await mySqlConnection.execute(insertBand, [bandsUuid, currentPost._embedded?.attractions[j].name, currentPost._embedded.attractions[j].classifications[0].genre.name])
                                            await mySqlConnection.execute(insertConcertBand, [post.concertUuid, bandsUuid, 0])
                                        } else {
                                            // @ts-ignore
                                            await mySqlConnection.execute(insertConcertBand, [post.concertUuid, storedUuid[0][0].uuid, 0])
                                        }
                                    }
                                }
                            }
                        }
                        console.log(`Downloaded page: ${page} of ${maxPage}.`)
                    }
                    await createPosts(correctedData)

                } catch (error) {
                    console.error(error)
                }
            } while (page < maxPage)
            console.log(`Download of ${states[i]} complete!`)
        }
        console.log('Download finished!')
    }
}

dataDownloader().catch(error => console.error(error))