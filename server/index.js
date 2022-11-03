require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;
const Pepper = process.env.PEPPER;

const dbconnection = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7530554",
  password: "YrwCy47Vfi",
  database: "sql7530554",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("In Server");
});

app.post("/register", (req, res) => {
  const Username = req.body.Username;
  const Password = Pepper + req.body.Password;

  const FavWord = req.body.FavWord;
  const FavSymbol = req.body.FavSymbol;

  dbconnection.query(
    "SELECT * FROM useraccount WHERE ? IN (Username);",
    Username,
    (err, response) => {
      //console.log(response)
      if (response.length != 0) {
        res.send({
          message: "Username already exists, choose a different one",
        });
      } else {
        dbconnection.query(
          "SELECT * FROM useraccount WHERE Username = ?;",
          Username,
          (err, response) => {
            if (err) {
              console.log(err);
            } else {
              bcrypt.hash(Password, saltRounds, (err, hash) => {
                if (err) {
                  console.log(err);
                }
                dbconnection.query(
                  "INSERT INTO useraccount (Username, Password, FavWord, FavSymbol) VALUES (?,?,?,?)",
                  [Username, hash, FavWord, FavSymbol],
                  (err, result) => {
                    console.log(err);
                  }
                );
              });
            }
          }
        );
        res.send(response);
      }
    }
  );
});

app.post("/login", (req, res) => {
  const Username = req.body.Username;
  const Password = Pepper + req.body.Password;

  dbconnection.query(
    "SELECT * FROM useraccount WHERE Username = ?;",
    Username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(Password, result[0].Password, (error, response) => {
          if (response) {
            res.send(response);
          } else {
            res.send({ message: "Wrong username/password combination" });
          }
        });
      } else {
        res.send({ message: "User can not be found" });
      }
    }
  );
});

app.post("/getFavWord&Symbol", (req, res) => {
  const Username = req.body.Username;

  dbconnection.query(
    "SELECT * FROM useraccount WHERE Username = ?;",
    Username,
    (err, result) => {
      res.send(Object.values(JSON.parse(JSON.stringify(result))));
    }
  );
});

app.post("/save", (req, res) => {
  const Username = req.body.Username;
  const url = req.body.urlSave;
  const password = req.body.passwordSave;

  dbconnection.query(
    "SELECT idUserAccount FROM useraccount WHERE ? IN (Username);",
    Username,
    (err, response) => {
      const id = Object.values(JSON.parse(JSON.stringify(response)))[0]
        .idUserAccount;
      //console.log(id)
      dbconnection.query(
        "SELECT * FROM savedpasswords WHERE ? IN (Url) AND ? IN (UserId);",
        [url, id],
        (err, response) => {
          if (response.length != 0) {
            res.send({
              message:
                "Url already has a saved password, if you want to change it please Update it",
            });
          } else {
            dbconnection.query(
              "INSERT INTO savedpasswords (UserId, Url, password ) VALUES (?,?,?);",
              [id, url, password],
              (err, response) => {
                res.send(response);
              }
            );
          }
        }
      );
    }
  );
});

app.post("/update", (req, res) => {
  const Username = req.body.Username;
  const url = req.body.urlSave;
  const password = req.body.passwordSave;

  dbconnection.query(
    "SELECT idsavedpasswords FROM savedpasswords WHERE ? IN (Url);",
    url,
    (err, response) => {
      const id = Object.values(JSON.parse(JSON.stringify(response)))[0]
        .idsavedpasswords;
      dbconnection.query(
        "UPDATE savedpasswords SET password = ? WHERE idsavedpasswords = ?;",
        [password, id],
        (err, response) => {
          res.send({ message: "Password was changed for: " + url });
        }
      );
    }
  );
});

app.post("/find", (req, res) => {
  const searchurl = req.body.url;
  const Username = req.body.username;

  dbconnection.query(
    "SELECT idUserAccount FROM useraccount WHERE ? IN (Username);",
    Username,
    (err, response) => {
      const id = Object.values(JSON.parse(JSON.stringify(response)))[0]
        .idUserAccount;
      dbconnection.query(
        "SELECT * FROM savedpasswords WHERE ? IN (Url) AND ? IN (UserId) ;",
        [searchurl, id],
        (err, response) => {
          if (response.length != 0) {
            dbconnection.query(
              "SELECT password FROM savedpasswords WHERE ? IN (Url) AND ? IN (UserId);",
              [searchurl, id],
              (err, response) => {
                if (err) {
                  res.send({ message: "No url available" });
                }
                res.send(
                  Object.values(JSON.parse(JSON.stringify(response)))[0]
                    .password
                );
              }
            );
          } else {
            res.send({ message: "No url found!" });
          }
        }
      );
    }
  );
});

app.post("/changefavword", (req, res) => {
  const favWord = req.body.FavWord;
  const username = req.body.Username;

  dbconnection.query(
    "SELECT idUserAccount FROM useraccount WHERE ? IN (Username);",
    username,
    (err, response) => {
      const id = Object.values(JSON.parse(JSON.stringify(response)))[0]
        .idUserAccount;
      dbconnection.query(
        "UPDATE useraccount SET FavWord = ? WHERE idUserAccount = ?;",
        [favWord, id],
        (err, response) => {
          res.send({ message: "Favourite Word was changed to: " + favWord });
        }
      );
    }
  );
});

app.post("/changefavsymbol", (req, res) => {
  const favSmybol = req.body.FavSymbol;
  const username = req.body.Username;

  dbconnection.query(
    "SELECT idUserAccount FROM useraccount WHERE ? IN (Username);",
    username,
    (err, response) => {
      const id = Object.values(JSON.parse(JSON.stringify(response)))[0]
        .idUserAccount;
      dbconnection.query(
        "UPDATE useraccount SET FavSymbol = ? WHERE idUserAccount = ?;",
        [favSmybol, id],
        (err, response) => {
          res.send({
            message: "Favourite Symbol was changed to: " + favSmybol,
          });
        }
      );
    }
  );
});

app.post("/changepassword", (req, res) => {
  const newPassword = Pepper + req.body.NewPassword;
  const username = req.body.Username;

  dbconnection.query(
    "SELECT idUserAccount FROM useraccount WHERE ? IN (Username);",
    username,
    (err, response) => {
      const id = Object.values(JSON.parse(JSON.stringify(response)))[0]
        .idUserAccount;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          dbconnection.query(
            "UPDATE useraccount SET Password = ? WHERE idUserAccount = ?;",
            [hash, id],
            (err, response) => {
              res.send({ message: "Password was changed to: " + hash });
            }
          );
        });
      });
    }
  );
});

app.post("/deleteuser", (req, res) => {
  const username = req.body.Username;
  dbconnection.query(
    "DELETE FROM useraccount WHERE ? IN (Username) ;",
    username,
    (err, response) => {
      res.send({ message: "User: " + username + " was deleted succesfully" });
    }
  );
});

app.listen(3000, () => {
  console.log("running server");
});

app.listen(PORT, () => {
  console.log("running server on port", PORT);
});

/* 
dbconnection.connect((error) => {
    if(error){
      console.log('Error connecting to the MySQL Database');
      return;
    }
    console.log('Connection established sucessfully');
  });

  dbconnection.end((error) => {
  });
  */
