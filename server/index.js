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
    //console.log('in in ')
    const Username = req.body.Username
    const Password = Pepper + req.body.Password
    console.log(Password)
    const FavWord = req.body.FavWord
    const FavSymbol = req.body.FavSymbol


    res.send("In Register: " + FavSymbol)

    // const Username = "test6"
    // const Password = "kirti"
    // const FavWord = "kirti"
    // const FavSymbol = "@"
    bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(Password , salt, (err, hash) => {
    if (err) {
      console.log(err)
    }
    dbconnection.query("INSERT INTO useraccount (Username, Password, FavWord, FavSymbol) VALUES (?,?,?,?)",
     [Username, hash, FavWord, FavSymbol],
     (err, result) =>{
        console.log(err);
    })
  })
})
})

app.post('/login', (req, res) => {
  //console.log("In Login: ")
  const Username = req.body.Username
  const Password = Pepper + req.body.Password
  //const Username = "kartik"
  //const Password = "test"
  dbconnection.query("SELECT * FROM useraccount WHERE Username = ?;",
     Username,
     (err, result) =>{
        if(err) {
          res.send({err: err});
        }
          if (result.length > 0){
            bcrypt.compare(Password, result[0].Password, (error, response) => {
              if (response){
                console.log({message: "got Password"})
              } else {
                console.log({message: "Wrong username/password combination"});
              }
            })
          } else {
            console.log({message: "User doesn't exist"});
          }
        
      })
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
