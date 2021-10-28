const Service = require('node-windows').Service;

const svc = new Service({
    name: "nodeBasicServer",
    description: "This servise is used to run node app on windows startup",
    script: "H:\\Projects\\github\\SignatureCheck\\app.js"
});

svc.on('install', ()=>{
    svc.start();
});

svc.install();