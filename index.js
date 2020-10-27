const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// Fake Database
var DB = {

    games:[
        {
            id: 1,
            title: "COD",
            year: 2019,
            price: 60

        },{
            id: 2,
            title: "BF4",
            year: 2017,
            price: 30

        },{
            id: 3,
            title: "LOL",
            year: 2013,
            price: 0

        }
       

    ]




}

app.get("/games",(req,res)=>{
    res.statusCode = 200;
   res.json(DB.games);
});


app.listen(45678,()=>{
    console.log("API RODANDO");
});

//para rodar o servidor local host utilize:
// nodemon index.js
// se caso falhar
//npx nodemon index.js