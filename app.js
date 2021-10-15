const express = require('express');
const sessions = require('express-session');

const path = require('path');

const { authUser } = require('./auth');

const PORT = 4000;

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
    
    const { clients, auth } = authUser(req,res);
    // console.log(req.query.code)
    if(auth){
        if(clients.includes(req.query.code)){
            res.render('index',{ title: 'Home', name: req.session.user, clients: clients, imgCode: req.query.code });
        }
        else{
            res.render('index',{ title: 'Home', name: req.session.user, clients: clients, imgCode: "welcome" });
        }
    }
    else{
        res.render('login',{ title: 'Login' });
    }
});


app.post('/',(req,res)=>{
    const { clients, auth } = authUser(req,res);

    if(auth){
        if(clients.includes(req.query.code)){
            res.render('index',{ title: 'Home', name: req.session.user, clients: clients, imgCode: req.query.code });
        }
        else{
            res.render('index',{ title: 'Home', name: req.session.user, clients: clients, imgCode: "welcome" });
        }
    }
    
});


app.get('/image',(req,res)=>{
    const { clients, auth } = authUser(req,res);

    if(auth){
        const { sendImg } = require('./sendsig');
        const code = req.query.code;
        if(clients.includes(code)){
            sendImg(code,res);
        }
        else if(code == "welcome"){
            sendImg(code,res);
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.render('login',{title: 'Login'});
    } 

});
