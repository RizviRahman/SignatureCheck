const xlsx = require('xlsx');

let xlFile = xlsx.readFile("xls/trader.xlsx");

let xlSheet = xlFile.Sheets[xlFile.SheetNames[0]];

let trader = {};




// console.log(xlSheet[`!ref`]);       // xlSheet[`!ref`] gives the range of cells  [A1:B27]

let split = xlSheet[`!ref`].split(":")[1];      // to extract last cell value

// console.log(split.match( /[0-9]+/g)[0]);        // to find the number of row from the cell value 

let traderNumber = parseInt(split.match( /[0-9]+/g)[0]);      // to parse it in integer format 




for(let index = 2; index <= traderNumber; index++){
    const name = xlSheet[`A${index}`].v;
    const pass = xlSheet[`B${index}`].v;
    const role = xlSheet[`C${index}`].v;

    trader[name] = { pass: pass, role: role };

    // console.log(code,trader);
}

// console.log(trader);
// console.log(trader['Sagar'].role);


module.exports = { trader, traderNumber };
// module.export