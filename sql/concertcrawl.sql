CREATE TABLE user (
    userId BINARY(16) NOT NULL,
    userFirstName VARCHAR(30) NOT NULL,
    userLastName VARCHAR(30) NOT NULL,
    userProfileName VARCHAR(30) NOT NULL UNIQUE,
    userEmail VARCHAR(128) NOT NULL UNIQUE,
    userHash CHAR(97) NOT NULL,
    userActivationToken CHAR(32),
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
    concertImage VARCHAR(200),
    concertTicketUrl VARCHAR(200),
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
    bandImage VARCHAR(200),
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
    FOREIGN KEY(userFavoritesUserId) REFERENCES user(userId),
    FOREIGN KEY(userFavoritesBandId) REFERENCES band(bandId),
    PRIMARY KEY(userFavoritesUserId, userFavoritesBandId)
);

CREATE TABLE userConcerts (
    userConcertsUserId BINARY(16),
    userConcertsConcertId BINARY(16),
    FOREIGN KEY(userConcertsUserId) REFERENCES user(userId),
    FOREIGN KEY(userConcertsConcertId) REFERENCES concert(concertId),
    PRIMARY KEY(userConcertsUserId, userConcertsConcertId)
);