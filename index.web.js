const SuperPixelApps = require('./superpixelapps');
const SuperPixelApp = require('./superpixelapp');
const SuperPixel = require('./superpixel');

$(function () {
    let form = $("#post_form");
    form.submit(function (event) {
        form.addClass('was-validated');

        event.preventDefault();
        event.stopPropagation();

        if (form[0].checkValidity()) {
            onApply($("#ip").val(), $("#app").val());
        }
    });

    $("#app").change(function () {
        if (form[0].checkValidity()) {
            onApply($("#ip").val(), $("#app").val());
        }
    });

    let apps = SuperPixelApp.list();

    apps.forEach(function (element) {
        $('#app').append($('<option>', { value: element, text: element }));
    });
});

let kit = null;
let last_ip = null;
function onApply(ip, app) {
    console.log('onApply ip=[' + ip + '] app=[' + app + ']');
    
    if (ip != last_ip) {
        kit = new SuperPixel({ ip });
        kit.connect()
        .then((device) => {
            console.log(`Connected to ${kit.location()}`);
            console.log("Apps: " + JSON.stringify(SuperPixelApp.list()));
            SuperPixelApp.activate(kit, app);
            last_ip = ip;
        })
        .catch(error => {
            kit = null;
            console.log("failed with error: " + error);
            kit.disconnect();
        }); 
    } else {
        SuperPixelApp.activate(kit, app);  
    }
    return false;
}

