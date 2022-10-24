/* Query code um die Datenbank auf seinem eigenem Gerät aufzusetzen */


CREATE TABLE `useraccount` (
  `idUserAccount` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(45) NOT NULL,
  `Password` varchar(60) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `FavWord` varchar(45) NOT NULL,
  `FavSymbol` varchar(45) NOT NULL,
  PRIMARY KEY (`idUserAccount`),
  UNIQUE KEY `Username_UNIQUE` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1



CREATE TABLE `savedpasswords` (
  `idsavedpasswords` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `Url` varchar(45) NOT NULL,
  `password` varchar(60) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`idsavedpasswords`),
  KEY `fk_userid_idx` (`UserId`),
  CONSTRAINT `fk_userid` FOREIGN KEY (`UserId`) REFERENCES `useraccount` (`idUserAccount`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1

/*
ALTER TABLE useraccount AUTO_INCREMENT = 1;

ALTER TABLE savedpasswords AUTO_INCREMENT = 1;
*/