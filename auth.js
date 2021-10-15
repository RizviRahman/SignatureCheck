const { trader, traderNumber } = require('./trader');
const { clientByTrader, allClient } = require('./clients');

let clients;

let auth = false;
const authUser = (req, res)=>{
    const { username, password } = req.body;

    if(username && password){
        if(req.session.authenticated){
            if(trader[username].role==1){
                clients = allClient();
            }
            else{
                clients = clientByTrader(username);
            }
        }
        else if(trader[username]){
            if(trader[username].pass==password){
                req.session.authenticated = true;
                req.session.user = username;

                if(trader[username].role==1){
                    clients = allClient();
                }
                else{
                    clients = clientByTrader(username);
                }
            }
        }
    }

    auth = req.session.authenticated;

    return {
        clients, auth
    };
};

module.exports = { authUser };
