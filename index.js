const SuperPixelApps = require('./superpixelapps');
const SuperPixelApp = require('./superpixelapp');
const SuperPixel = require('./superpixel');

function connectOptions() {
    if (process.argv.length < 4) {
        return { path: "/dev/ttyUSB0" };
    } else if (process.argv[3].indexOf(".") != -1) {
        return { ip: process.argv[3] }; 
    } else {
        return { path: process.argv[3] }; 
    }
}

if (process.argv.length <= 2) {

    console.log("Wrong number of arguments. Use the source luke.");

} else if (process.argv[2] == "list-devices") {

    SuperPixel.listConnectedDevices()
        .then((devices) => {
            console.log(`Found ${devices.length} connected devices`);

            devices.forEach(function(device) {
                console.log(`> ${device.path}`);
                device.disconnect();
              });
        });

} else if (process.argv[2] == "device-info") {

    let kit = new SuperPixel(connectOptions());
    kit.connect()
    .then((device) => {
        console.log(`Connected to ${kit.location()}`);
        return kit.getDeviceInfo(); 
    })
    .then((data) => {
        console.log(`Version: ${data.major}.${data.minor}.${data.patch}`);
        return kit.getBatteryStatus();
    })
    .then((data) => {
        console.log(`Battery: ${data.percent} ${data.status}`);
        return kit.getWifiStatus();
    })
    .then((data) => {
        console.log(`Wifi: ${data.ip} ${data.ssid}`);
        return kit.scanWifi()
    })
    .then((data) => {
        let networks = [];
        data.forEach(network => networks.push(network.ssid));
        console.log("Networks: " + JSON.stringify(networks));
        kit.disconnect();
        return Promise.resolve();  
    })
    .catch(error => {
        console.log("failed with error: " + error);
        kit.disconnect();
    }); 

} else if (process.argv[2] == "device-wifi") {

    let kit = new SuperPixel(connectOptions());
    kit.connect()
    .then((device) => {
        console.log(`Connected to ${kit.location()}`);
        return kit.connectToWifi(process.argv[4], process.argv[5]);
    })
    .then((data) => {
        console.log(`Wifi ${data.ip} ${data.ssid}`);
        kit.disconnect();
        return Promise.resolve();  
    })
    .catch(error => {
        console.log("failed with error: " + error);
        kit.disconnect();
    }); 

} else if (process.argv[2] == "device-name") {

    let name = 'My Pixel Kit ' + parseInt(Math.random()*100);

    if (process.argv.length >= 5) {
        name = process.argv[4];
    } 
    
    let kit = new SuperPixel(connectOptions());
    kit.connect()
    .then((device) => {
        console.log(`Connected to ${kit.location()}`);
        return kit.setName(name);
    })
    .then((data) => {
        return kit.getName();
    })
    .then((data) => {
        console.log('Pixel kit name is set to', data.name);
        kit.disconnect(); 
    })
    .catch(error => {
        console.log("failed with error: " + error);
        kit.disconnect();
    }); 

} else if (process.argv[2] == "device-app") {

    let kit = new SuperPixel(connectOptions());
    kit.connect()
    .then((device) => {
        console.log(`Connected to ${kit.location()}`);
        console.log("Apps: " + JSON.stringify(SuperPixelApp.list()));
        SuperPixelApp.activate(kit, process.argv[4])
    })
    .catch(error => {
        console.log("failed with error: " + error);
        kit.disconnect();
    }); 

} else {
    console.log("Unknown command. Use the source luke.");
}