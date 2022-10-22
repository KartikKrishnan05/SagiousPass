const express = require('express')
const cors = require("cors")
const app = express()
const mysql = require('mysql')

const bcrypt = require('bcrypt')
const saltRounds = 10
const Pepper = "Yoru"

const dbconnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kkottobrunn2013.',
  database: 'sagiouspass'
})

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("In Server")
})

app.post('/register', (req, res) => {

  const Username = req.body.Username
  const Password = Pepper + req.body.Password

  const FavWord = req.body.FavWord
  const FavSymbol = req.body.FavSymbol

  dbconnection.query("SELECT * FROM useraccount WHERE ? IN (Username);",
    Username,
    (err, response) => {
      //console.log(response)
      if (response.length != 0) {
        res.send({ message: "Username already exists, choose a different one" })
      } else {
        dbconnection.query("SELECT * FROM useraccount WHERE Username = ?;",
          Username,
          (err, response) => {
            if (err) {
              console.log(err)
            } else {
              bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(Password, salt, (err, hash) => {
                  if (err) {
                    console.log(err)
                  }
                  dbconnection.query("INSERT INTO useraccount (Username, Password, FavWord, FavSymbol) VALUES (?,?,?,?)",
                    [Username, hash, FavWord, FavSymbol],
                    (err, result) => {
                      console.log(err);
                    })
                })
              })
            }
          })
        res.send(response)
      }
    }
  )
})

app.post('/login', (req, res) => {

  const Username = req.body.Username
  const Password = Pepper + req.body.Password

  dbconnection.query("SELECT * FROM useraccount WHERE Username = ?;",
    Username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(Password, result[0].Password, (error, response) => {
          bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(Password, salt, (err, hash) => {
              console.log(hash)
            })
          })
          console.log(result[0].Password)
          if (response) {
            res.send()
          } else {
            res.send({ message: "Wrong username/password combination" });
          }
        })
      } else {
        res.send({ message: "User doesn't exist" });
      }

    })
})

app.post('/getFavWord&Symbol', (req, res) => {

  const Username = req.body.Username

  dbconnection.query("SELECT * FROM useraccount WHERE Username = ?;",
    Username,
    (err, result) => {
      res.send(Object.values(JSON.parse(JSON.stringify(result))))
    }
  )
})


app.listen(3000, () => {
  console.log("running server");
})

// dbconnection.connect((error) => {
//     if(error){
//       console.log('Error connecting to the MySQL Database');
//       return;
//     }
//     console.log('Connection established sucessfully');
//   });

  //dbconnection.end((error) => {
  //});
