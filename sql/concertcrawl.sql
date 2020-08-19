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
    concertDate DATETIME NOT NULL,
    concertTime DATETIME(6),
    concertVenueName VARCHAR(60) NOT NULL,
    concertAddress VARCHAR(80) NOT NULL,
    concertZip CHAR(5) NOT NULL,
    concertLat FLOAT(10, 6),
    concertLong Float(10, 6),
    PRIMARY KEY(concertId),
    INDEX(concertName)
);

CREATE TABLE band (
    bandId BINARY(16) NOT NULL,
    bandName VARCHAR(50) NOT NULL,
    bandGenre VARCHAR(20) NOT NULL,
    bandDescription VARCHAR(100),
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

-- Necessary concert creation functions
-- Creating concert: INSERT INTO concert(concertId, concertName, concertDate, concertTime, concertVenueName, concertAddress, concertZip, concertLat, concertLong) VALUES (UUID_TO_BIN("placeholderUUID"), "Some Concert", "Some Date", "Some Time", "Some Venue", "Some Address", "12345", "1234567890.123456", "1234567890.123456");
-- Deleting concert: DELETE FROM concert WHERE concertId = UUID_TO_BIN("placeholderUUID");

-- Necessary band creation functions
-- Creating band: INSERT INTO band(bandId, bandName, bandGenre, bandDescription, bandImage) VALUES (UUID_TO_BIN("placeholderUUID"), "Some Band Name", "Band Genre", "Some long description", "Some Band Image Link");

-- Necessary concert search functions
-- Finding by location: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE concert.concertZip = "87102";
-- Finding by band: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE band.bandName = "Test Band";
-- Finding by genre: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE band.bandGenre = "Band Genre";
-- Finding by date: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE concert.concertDate <= "2020-12-31";
-- Finding by date and location: SELECT concert.concertName, concert.concertDate, concert.concertTime, concert.concertVenueName, concert.concertAddress, band.bandName, band.bandGenre, band.bandDescription, band.bandImage FROM concertBands INNER JOIN concert on concert.concertId = concertBands.concertBandsConcertId INNER JOIN band on band.bandId = concertBands.concertBandsBandId WHERE concert.concertDate <= "2020-12-31" AND concert.concertZip = "87102";
-- Finding by genre and location:
-- Finding by genre and date:
-- Finding by genre, date, and location:


