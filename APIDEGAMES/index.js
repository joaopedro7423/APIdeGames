const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//esse comando serve para evitar que quere a api quando requisitado. (já utilizado) 
//npm install cors --save

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
//busca todos os dados
app.get("/games",(req,res)=>{
    res.statusCode = 200;
    res.json(DB.games);
});
//busca os dados individualmente pelo id
app.get("/game/:id",(req,res)=>{

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
            var id = parseInt(req.params.id);

            var game = DB.games.find(g=>g.id==id);
            if(game != undefined){
                res.statusCode = 200;
                res.json(game);
            }else{
                res.sendStatus(404);
            }
    }

});

// Salvar mais dados
app.post("/game",(req,res)=>{

        var {title,price,year} = req.body;

        DB.games.push({
            id: 2121,
            title,
            price,
            year
        });

        res.sendStatus(200);

});

//deletar
app.delete("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
            var id = parseInt(req.params.id);

            var index = DB.games.findIndex(g=>g.id==id);
       
            if(index == -1){
                res.sendStatus(404);
            }else{
                DB.games.splice(index,1);
                res.sendStatus(200);
            }
    }
    

});

// alterar 
app.put("/game/:id",(req,res)=>{

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
            var id = parseInt(req.params.id);

            var game = DB.games.find(g=>g.id==id);
            if(game != undefined){
            var {title,price,year} = req.body;

                if(title != undefined){
                        game.title = title;
                }

                if(price != undefined){
                    game.price = price;
                }

                if(year != undefined){
                    game.year = year;
                }

            }else{
                res.sendStatus(404);
            }
    }
      

});


app.listen(45678,()=>{
    console.log("API RODANDO");
});

//para rodar o servidor local host utilize:
// nodemon index.js
// se caso falhar
//npx nodemon index.js