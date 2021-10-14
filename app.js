const express = require('express');

const sessions = require('express-session');

const path = require('path');

const PORT = 4000;

const { trader, traderNumber } = require('./trader');

const { clientByTrader, allClient } = require('./clients');
let clients;
// console.log(trader['Omee'].pass);

const app = express();
app.set('view engine', 'ejs');
app.listen(PORT);


let publicPath = path.join(__dirname,'public');

//serving public file
app.use(express.static(publicPath));

const oneMin = 1000 * 30 ;

//session middleware
app.use(sessions({
    secret: "secret",
    saveUninitialized:false,
    cookie: { maxAge: oneMin },
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/',(req,res)=>{
    
    if(req.session.authenticated){
        if(trader[username].role==1){
            clients = allClient();
        }
        else{
            clients = clientByTrader(username);
        }
        res.render('index',{ title: 'Home', name: req.session.user, clients: clients });
    }
    else{
        res.render('login',{title: 'Login'});
    }
});


app.post('/',(req,res)=>{
    const { username, password } = req.body;

    // console.log(req.body);
    // console.log(username, password);
    // console.log(trader[username]);

    if(username && password){
        if(req.session.authenticated){
            // res.json(req.session);
            if(trader[username].role==1){
                clients = allClient();
            }
            else{
                clients = clientByTrader(username);
            }
            res.render('index',{ title: 'Home', name: req.session.user, clients: clients });
        }
        else{
            if(trader[username].pass==password){
                req.session.authenticated = true;
                req.session.user = username;
                // res.json(req.session);

                // client data cutted from here

                if(trader[username].role==1){
                    clients = allClient();
                }
                else{
                    clients = clientByTrader(username);
                }

                res.render('index',{ title: 'Home', name: req.session.user, clients: clients });
            }
            else{
                // res.status(403).json({ msg: 'Bad input'});
                res.render('login',{title: 'Login'});
            }   
        }
    }
    else{
        // res.status(403).json({ msg: 'Bad input'});
        res.render('login',{title: 'Login'});
    }
});


app.get('/image',(req,res)=>{
    const { sendImg } = require('./sendsig');
    // console.log(req.query.code);

    const code = req.query.code;


    if(req.session.authenticated){
        sendImg(code,res);
    }
    else{
        res.render('login',{title: 'Login'});
    }
});


