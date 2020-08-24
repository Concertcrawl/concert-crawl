CREATE TABLE profile (
    userId BINARY(16) NOT NULL,
    userFirstName VARCHAR(30) NOT NULL,
    userLastName VARCHAR(30) NOT NULL,
    userProfileName VARCHAR(30) NOT NULL,
    userEmail VARCHAR(128) NOT NULL,
    userHashedPassword CHAR(97) NOT NULL,
    userZip CHAR(5),
    UNIQUE(userProfileName),
    UNIQUE(userEmail),
    PRIMARY KEY(userId)
);

CREATE TABLE concert (
    concertId BINARY(16) NOT NULL,
    concertName VARCHAR(100) NOT NULL,
    concertGenre VARCHAR(100) NOT NULL,
    concertDate DATE NOT NULL,
    concertTime TIME,
    concertVenueName VARCHAR(200),
    concertAddress VARCHAR(300),
    concertZip VARCHAR(10),
    concertLat FLOAT(10, 6),
    concertLong Float(10, 6),
    PRIMARY KEY(concertId),
    INDEX(concertName)
);

CREATE TABLE band (
    bandId BINARY(16) NOT NULL,
    bandName VARCHAR(100) NOT NULL,
    bandGenre VARCHAR(100),
    bandDescription VARCHAR(1000),
    bandImage VARCHAR(30),
    UNIQUE(bandName),
    INDEX(bandName),
    PRIMARY KEY(bandId)
);

CREATE TABLE concertBands (
    concertBandsBandId BINARY(16),
    concertBandsConcertId BINARY(16),
    concertBandsIsHeadliner BIT,
    FOREIGN KEY (concertBandsBandId) REFERENCES band(bandId),
    FOREIGN KEY (concertBandsConcertId) REFERENCES concert(concertId),
    PRIMARY KEY(concertBandsBandId, concertBandsConcertId)
);

CREATE TABLE userFavorites (
    userFavoritesUserId BINARY(16),
    userFavoritesBandId BINARY(16),
    FOREIGN KEY(userFavoritesUserId) REFERENCES profile(userId),
    FOREIGN KEY(userFavoritesBandId) REFERENCES band(bandId),
    PRIMARY KEY(userFavoritesUserId, userFavoritesBandId)
);

CREATE TABLE userConcerts (
    userConcertsUserId BINARY(16),
    userConcertConcertId BINARY(16),
    FOREIGN KEY(userConcertsUserId) REFERENCES profile(userId),
    FOREIGN KEY(userConcertConcertId) REFERENCES concert(concertId),
    PRIMARY KEY(userConcertsUserId, userConcertConcertId)
);

-- Necessary user functions
-- Creating Profile:  INSERT INTO profile(userId, userFirstName, userLastName, userProfileName, userEmail, userHashedPassword) VALUES (UUID_TO_BIN("placeholderUUID"), "John", "Doe", "JohnDoe", "johndoe@doe.edu", "placeholderHash");
-- Updating Password: UPDATE profile SET userPassword = "placeholderHash" WHERE userId = UUID_TO_BIN("placeholderUUID");
-- Updating FirstName: UPDATE profile SET userFirstName = "placeholderFirstName" WHERE userId = UUID_TO_BIN("placeholderUUID");
-- Updating Location: UPDATE profile SET userZip = "12345" WHERE userId = UUID_TO_BIN("placeholderUUID");
-- Delete User Account: DELETE FROM profile WHERE userId = UUID_TO_BIN("placeholderUUID");

-- Followed band functions
-- Add Band to Followed Band: INSERT INTO userFavorites(userFavoritesUserId, userFavoritesBandId) VALUES
-- Add Concert to Followed Concert: INSERT INTO userConcerts(userConcertsUserId, userConcertConcertId) VALUES
-- Remove Band from Followed Band: DELETE FROM userFavorites WHERE userFavoritesUserId =
-- Remove Concert from Followed Concert: DELETE FROM userConcerts WHERE userConcertsUserId =


-- Necessary concert creation functions
-- Creating concert: INSERT INTO concert(concertId, concertName, concertDate, concertTime, concertVenueName, concertAddress, concertZip, concertLat, concertLong) VALUES (UUID_TO_BIN("fb257fc5-2cbc-489b-bb02-a71d40f31ff6"), "Some Concert", "2020-12-30", "2020-12-30 21:00:00", "Some Venue", "Some Address", "12345", "1234567890.123456", "1234567890.123456");
-- Deleting concert: DELETE FROM concert WHERE concertId = UUID_TO_BIN("placeholderUUID");

-- Necessary band creation functions
-- Creating band: INSERT INTO band(bandId, bandName, bandGenre, bandDescription, bandImage) VALUES (UUID_TO_BIN("a812b8d8-1819-400e-9771-2176bf82579c"), "Test Band Name", "Test Genre", "Some long description", "Some Band Image Link");












-- Necessary concert search functions
-- Finding by location: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE concert.concertZip = "87102";
-- Finding by band: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE band.bandName = "Test Band";
-- Finding by genre: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE band.bandGenre = "Band Genre";
-- Finding by date: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE concert.concertDate <= "2020-12-31";


-- Finding by date and location: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE concert.concertDate <= "2020-12-31" AND concert.concertZip = "87102";

-- Finding by genre and location: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE band.bandGenre = "Test Genre" AND concert.concertZip = "87102";

-- Finding by genre and band: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE band.bandGenre = "Test Genre" AND band.bandName = "Test Band";

-- Finding by genre and date: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE band.bandGenre = "Test Genre" AND concert.concertDate <= "2020-12-31";

-- Finding by band and date: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE band.bandName = "Test Band" AND concert.concertDate <= "2020-12-31";

-- Finding by band and location: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE band.bandName = "Test Band" AND concert.concertZip = "87102";


-- Finding by genre, date, and location: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE band.bandGenre = "Test Genre" AND concert.concertDate <= "2020-12-31" AND concert.concertZip = "87102";

-- Finding by genre, location, and band: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE band.bandGenre = "Test Genre" AND band.bandName = "Test Band" AND concert.concertZip = "87102";

-- Finding by date, location, and band: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE band.bandName = "Test Band" AND concert.concertDate <= "2020-12-31" AND concert.concertZip = "87102";

-- Finding by genre, band, and date: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE band.bandGenre = "Test Genre" AND concert.concertDate <= "2020-12-31" AND band.bandName = "Test Band";

-- Finding by genre, location, band, and date: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE band.bandGenre = "Test Genre" AND concert.concertDate <= "2020-12-31" AND band.bandName = "Test Band" AND concert.concertZip = "87102";


