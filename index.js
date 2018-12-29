const SuperPixelApps = require('./superpixelapps');
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
        return kit.getBatteryStatus();
    })
    .then((data) => {
        console.log(`Battery ${data.percent} ${data.status}`);
        return kit.getWifiStatus();
    })
    .then((data) => {
        console.log(`Wifi ${data.ip} ${data.ssid}`);
        return kit.scanWifi()
    })
    .then((data) => {
        let networks = [];
        
        data.forEach(network => networks.push(network.ssid));

        console.log("Available Networks: " + JSON.stringify(networks));
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

} else if (process.argv[2] == "device-tail") {

    let kit = new SuperPixel(connectOptions());
    kit.connect()
    .then((device) => {
        console.log(`Connected to ${kit.location()}`);
        return kit.getBatteryStatus();
    })
    .catch(error => {
        console.log("failed with error: " + error);
        kit.disconnect();
    }); 

} else {
    console.log("Unknown command. Use the source luke.");
}