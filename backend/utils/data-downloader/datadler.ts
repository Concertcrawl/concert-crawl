import {connect} from "../../src/database";

require('dotenv').config()

import {v4 as uuidv4} from 'uuid';


const axios = require('axios')

interface Post {
    concertUuid: string,
    concertName: string | null,
    concertGenre: string,
    concertDate: number,
    concertTime: number | null,
    concertVenue: string | null,
    concertImage: string,
    concertTicketUrl: string,
    concertAddress: string | null,
    concertZip: number | null,
    concertLat?: number | string,
    concertLong?: number | string,
    concertBands: string | Array<string>
}

const checkImageSize = (imageInfo: Array<object>) => {
    let counter = 0
    do {
        // @ts-ignore
        if (imageInfo.images[counter].width < 300) {
            counter++
        } else {
            // @ts-ignore
            return imageInfo.images[counter].url
        }
    } while (counter <= 5)
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
                                page: page,
                                classificationName: 'music',
                                size: 100,
                                stateCode: states[i],
                                startDateTime: '2020-09-02T00:00:00Z'
                            }
                        })
                    let correctedData
                    // Checking if pulled data has event data, if not moving to next page or state.
                    if (data._embedded.hasOwnProperty('events')) {
                        correctedData = data._embedded.events
                    } else {
                        continue
                    }
                    // Api only allowed up to 10 pages, checking for total number of pages and setting max page based on that number.
                    if (data.page.totalPages > 9) {
                        maxPage = 9;
                    } else {
                        maxPage = data.page.totalPages - 1
                    }
                    // Declaring mysql connection.
                    const mySqlConnection = await connect()
                    const createPosts = async (array: any[]) => {
                        for (let currentPost of array) {
                            if (!currentPost?.name.includes("Megaticket") && !currentPost.classifications[0].genre?.name.includes('Theatre')) {
                                // Defining post object with external data.
                                let post: Post = {
                                    concertUuid: uuidv4(),
                                    concertName: currentPost.name,
                                    concertGenre: currentPost.classifications[0].genre.name,
                                    concertDate: currentPost.dates.start.localDate,
                                    concertTime: currentPost.dates.start?.localTime ?? '00:00:000',
                                    concertVenue: currentPost._embedded.venues[0]?.name,
                                    concertImage: checkImageSize(currentPost),
                                    concertTicketUrl: currentPost?.url ?? 'Tickets Not Available',
                                    concertAddress: currentPost._embedded.venues[0]?.address.line1 + ' ' + currentPost._embedded.venues[0].city.name + ' ' + currentPost._embedded.venues[0].state.stateCode,
                                    concertZip: currentPost._embedded.venues[0]?.postalCode.substring(0, 5),
                                    concertLat: currentPost._embedded.venues[0].location?.latitude ?? 123.1234,
                                    concertLong: currentPost._embedded.venues[0].location?.longitude ?? 123.1234,
                                    concertBands: currentPost._embedded?.attractions
                                }
                                console.log(post)


                                // Declaring MySQL functions.
                                let insertBand = "INSERT INTO band(bandId, bandName, bandGenre, bandImage) VALUES (UUID_TO_BIN(?), ?, ?, ?)"
                                let insertConcertBand = "INSERT INTO concertBands(concertBandsConcertId, concertBandsBandId, concertBandsIsHeadliner) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?)"
                                let mySqlConcertQuery = "INSERT INTO concert(concertId, concertName, concertGenre, concertDate, concertTime, concertVenueName, concertImage, concertTicketUrl, concertAddress, concertZip, concertLat, concertLong) VALUES (UUID_TO_BIN(:concertUuid), :concertName, :concertGenre, :concertDate, :concertTime, :concertVenue, :concertImage, :concertTicketUrl, :concertAddress, :concertZip, :concertLat, :concertLong)"
                                let selectBandUuid = "SELECT BIN_TO_UUID(band.bandId) AS uuid FROM band WHERE band.bandName = ?"

                                // Checking if concert has band information, if it does submitting concert information with mysql query.
                                if (currentPost?._embedded.hasOwnProperty('attractions') && !currentPost._embedded.attractions[0]?.name.includes('Tour')) {
                                    try {
                                        await mySqlConnection.execute(mySqlConcertQuery, post)
                                    } catch (error) {
                                    }
                                    // Iterating through each band.
                                    for (let j = 0; j < post.concertBands.length; j++) {
                                        // Determining if band is headliner.
                                        if (post.concertBands[j] == post.concertBands[0] && currentPost._embedded?.attractions[0].name != undefined) {
                                            let storedUuid = await mySqlConnection.execute(selectBandUuid, [currentPost._embedded?.attractions[0].name])
                                            // @ts-ignore
                                            // Determining if a band already exists, if it doesn't creates it and assigns a new uuid to it.
                                            if (storedUuid[0] == '') {
                                                let headLinerUuid = uuidv4()
                                                await mySqlConnection.execute(insertBand, [headLinerUuid, currentPost._embedded?.attractions[0].name, currentPost._embedded.attractions[0].classifications[0].genre.name, checkImageSize(currentPost._embedded.attractions[j])])
                                                await mySqlConnection.execute(insertConcertBand, [post.concertUuid, headLinerUuid, 1])
                                            } else {
                                                // @ts-ignore
                                                await mySqlConnection.execute(insertConcertBand, [post.concertUuid, storedUuid[0][0].uuid, 1])
                                            }
                                        // All bands other than headliner.
                                        } else if (currentPost._embedded?.attractions[j].name != undefined) {
                                            // Selecting uuid from concert.
                                            let storedUuid = await mySqlConnection.execute(selectBandUuid, [currentPost._embedded?.attractions[j].name])
                                            // @ts-ignore
                                            // Determining if a band already exists, if it doesn't creates it and assigns a new uuid to it.
                                            if (storedUuid[0] == '') {
                                                let bandsUuid = uuidv4()
                                                await mySqlConnection.execute(insertBand, [bandsUuid, currentPost._embedded?.attractions[j].name, currentPost._embedded.attractions[j].classifications[0].genre.name, checkImageSize(currentPost._embedded.attractions[j])])
                                                await mySqlConnection.execute(insertConcertBand, [post.concertUuid, bandsUuid, 0])
                                            } else {
                                                // @ts-ignore
                                                await mySqlConnection.execute(insertConcertBand, [post.concertUuid, storedUuid[0][0].uuid, 0])
                                            }
                                        }
                                    }
                                }

                            }
                        }
                        console.log(`Downloaded page: ${page} of ${maxPage}.`)
                    }
                    await createPosts(correctedData)
                    page++
                } catch
                    (error) {
                    console.log(error)
                    page++
                }
            }

            while (page <= maxPage)
            console.log(`Download of ${states[i]} complete!`)
        }
        console.log('Download finished!')
        return
    }
}

dataDownloader().catch(error => console.error(error))