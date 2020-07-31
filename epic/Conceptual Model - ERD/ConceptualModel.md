# Conceptual Model

## User Profile

* userID (primary key)

* userFirstName
 
* userLastName

* userProfileName

* userLocation

* userEmail

* userHashedPassword

## Concert

* concertId (primary key)

* concertName

* concertDate

* concertTime

* concertLocation

* concertVenue

* concertImage

## Band

* bandId (primary key)

* bandName

* bandGenre

* bandDescription

* bandImage

## User Favorite Bands

* userId (foreign key)

* bandId (foreign key)

## User Saved Concerts

* userId (foreign key)

* concertId (foreign key)

## Concert Bands

* concertId(foreign key)

* bandId(foreign)

* isHeadliner