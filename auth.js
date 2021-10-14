const { trader, traderNumber } = require('./trader');

let clients;

let auth = false;
const authUser = (req, res)=>{
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
            // res.render('index',{ title: 'Home', name: req.session.user, clients: clients });
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
    auth = req.session.authenticated;
};

module.exports = { clients, auth };