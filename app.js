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

const oneMin = 1000 * 60 *60 ;

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
    else{
        res.render('login',{title: 'Login'});
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

app.get('/logout',(req,res)=>{
    // req.session.destroy((err) => {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     res.redirect('/');
    // });
    // req.session.authenticated = false;
    // req.session.user = null;
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});
