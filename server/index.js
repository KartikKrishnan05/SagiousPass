const express = require('express')
const cors = require("cors") 
const app = express()
const mysql = require('mysql')

const dbconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Kkottobrunn2013.', 
    database: 'sagiouspass'
})

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Test World")
})

app.post('/register', (req, res) => {
    
    //console.log('in in ')
    const Username = req.body.Username
    
    const Password = req.body.Password
    const FavWord = req.body.FavWord
    const FavSymbol = req.body.FavSymbol
    res.send("In Register: " + FavSymbol)

    // const Username = "test6"
    // const Password = "kirti"
    // const FavWord = "kirti"
    // const FavSymbol = "@"

    console.log(Username)

    dbconnection.query("INSERT INTO useraccount (Username, Password, FavWord, FavSymbol) VALUES (?,?,?,?)",
     [Username, Password, FavWord, FavSymbol],
     (err, result) =>{
        console.log(err);
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
