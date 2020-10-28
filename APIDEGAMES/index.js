const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTSecret ="sakdmaskmdkasdlasdkm";

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//esse comando serve para evitar que quere a api quando requisitado. (já utilizado) 
//npm install cors --save

function auth(req,res,next){
    const authToken = req.headers['authorization'];
    
    if(authToken != undefined){
        const bearer = authToken.split('');
      

        jwt.verify(token,JWTSecret,(err,data)=>{
            if(err){
                res.status(401);
                res.json({err:"Token invalido"});
            }else{
                req.token = token;
                req.loggerUser = {id:data.id,email:data.email};
                req.empresa= "jooj Interprice";
                // console.log(data);
                next();
            }
        });

    }else{
        res.status(401);
        res.json({err:"Token invalido"});
    }
  
    next();
}




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
       

    ],
    users:[
        {
            id:1,
            name: "jooj",
            email:"jooj@gmail.com",
            password: "jojo"
        },
        {
            id:20,
            name: "peep",
            email: "peep@gmail.com",
            password:"pepe"
        }
    ]




}
//busca todos os dados
app.get("/games",auth,(req,res)=>{

    res.statusCode = 200;
    res.json( DB.games);
});

//busca os dados individualmente pelo id
app.get("/game/:id",auth,(req,res)=>{

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
app.post("/game",auth,(req,res)=>{

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
app.delete("/game/:id",auth,(req,res)=>{
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
app.put("/game/:id",auth,(req,res)=>{

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


app.post("/auth",(req,res)=>{
    var {email,password} =req.body;

    if(email !=undefined){
      var user = DB.users.find(u=>u.email == email);
    
        if(user != undefined){

            if(user.password == password){

                jwt.sign({id: user.id, email: user.email},JWTSecret,{expiresIn:'48h'},(err,token)=>{
                    if(err){
                        
                res.status(400);
                res.json({token: "Falha Interna"});
                    }else{
                        
                res.status(200);
                res.json({token: token});
                    }
                });

            }else{
                res.status(200);   
                res.json({err:"credenciais invalidas"});
        
            }

        }else{
            res.status(404);
            res.json({err:"O E-mail não existe na base de dados"});
        }
    
    
    }else{  
            res.status(400);
            res.json({err:"O E-mail é invalido"});
    }
});

app.listen(45678,()=>{
    console.log("API RODANDO");
});

//para rodar o servidor local host utilize:
// nodemon index.js
// se caso falhar
//npx nodemon index.js