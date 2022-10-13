CREATE TABLE `sagiouspass`.`useraccount` (
  `idUserAccount` INT NOT NULL,
  `Username` VARCHAR(45) NOT NULL,
  `Password` INT NOT NULL,
  `FavWord` VARCHAR(45) NOT NULL,
  `FavSymbol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUserAccount`),
  UNIQUE INDEX `Username_UNIQUE` (`Username` ASC) VISIBLE);

  