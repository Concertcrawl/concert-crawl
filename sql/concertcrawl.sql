CREATE TABLE profile (
    userId BINARY(16) NOT NULL,
    userFirstName VARCHAR(30) NOT NULL,
    userLastName VARCHAR(30) NOT NULL,
    userProfileName VARCHAR(30) NOT NULL,
    userEmail VARCHAR(128) NOT NULL,
    userHashedPassword CHAR(97) NOT NULL,
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