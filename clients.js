const xlsx = require('xlsx');

let xlFile = xlsx.readFile("xls/Client List with trader.xlsx");

let xlSheet = xlFile.Sheets[xlFile.SheetNames[0]];

let clientList = {};



let split = xlSheet[`!ref`].split(":")[1];      // to extract last cell value

let clientNo = parseInt(split.match( /[0-9]+/g)[0]);      // to parse it in integer format 



for(let index = 2; index <= clientNo; index++){
    const code = xlSheet[`A${index}`].v;
    const name = xlSheet[`B${index}`].v;
    const status = xlSheet[`J${index}`].v;
    const trader = xlSheet[`K${index}`].v;

    clientList[code] = { name: name, status: status, trader: trader };   // xl file read
}

// console.log(clientList);



const clientByTrader = (traderID) =>{
    const filteredClient ={};
    let i = 0;
    for (client in clientList){
        if(clientList[client].trader==traderID){
            filteredClient[client] = clientList[client];
        }
    }
    return filteredClient;
}

// console.log(clientByTrader('Kanak'));

const allClient = () =>{
    // const allClient =[];
    // let i = 0;
    // for (client in clientList){
    //     allClient[i] = client;
    //     i++;
    // }
    return clientList;
}

// const client = 'DN3722';
// if(clientList[client]){
//     console.log(clientList[client]);
// }
// else{
//     console.log('NOT_Available');
// }


// console.log(allClient());

// for (client in clientList){
//     // allClient[i] = client;
//     console.log(client, clientList[client].name, clientList[client].status, clientList[client].trader);
// }


module.exports = { clientByTrader, allClient };
// module.export