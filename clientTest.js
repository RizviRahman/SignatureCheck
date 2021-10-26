const xlsx = require('xlsx');

let xlFile = xlsx.readFile("xls/client_trader.xlsx");

let xlSheet = xlFile.Sheets[xlFile.SheetNames[0]];

let clientList = {};



let split = xlSheet[`!ref`].split(":")[1];      // to extract last cell value

let clientNo = parseInt(split.match( /[0-9]+/g)[0]);      // to parse it in integer format 


for(let index = 2; index <= clientNo; index++){
    clientList[xlSheet[`A${index}`].v] = xlSheet[`B${index}`].v;   // xl file read
}


const clientByTrader = (traderID) =>{
    const filteredClient =[];
    let i = 0;
    for (client in clientList){
        if(clientList[client]==traderID){
            filteredClient[i] = client;
            i++;
        }
    }
    return filteredClient;
}


const allClient = () =>{
    const allClient =[];
    let i = 0;
    for (client in clientList){
        allClient[i] = client;
        i++;
    }
    return allClient;
}


module.exports = { clientByTrader, allClient };
// module.export

