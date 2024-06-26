CREATE SCHEMA IF NOT EXISTS test;
USE test;
CREATE TABLE IF NOT EXISTS Station(
ID_Station INT NOT NULL PRIMARY KEY,
School_Name VARCHAR(128) not null,
Country VARCHAR(128) not null,
City VARCHAR(128) not null,
Coordinates VARCHAR(256)
);	

INSERT INTO Station(ID_Station, School_Name, Country, City, Coordinates) VALUES(
1, 
"Hogar Naval Stella Maris", 
"Argentina", 
"CABA",
"-34.63524928003645, -58.473339775738715");

INSERT INTO Station(ID_Station, School_Name, Country, City, Coordinates) VALUES(
2, 
"Pedro Blanes Viale", 
"Uruguay", 
"Mercedes",
"-33.252743503715116, -58.031922087455875");



SELECT * FROM Station;

CREATE TABLE IF NOT EXISTS Stats(
ID_Station INT NOT NULL,
Stat_ID INT NOT NULL auto_increment,
Temp Float NOT NULL,
Sun INT NOT NULL,
Wind float NOT NULL,
Humidity float NOT NULL,
Date datetime,
foreign key(ID_Station) REFERENCES Station(ID_Station),
primary key(ID_Station,Stat_ID)
);
