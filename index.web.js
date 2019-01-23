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

function onApply(ip, app) {
    console.log('onApply ip=[' + ip + '] app=[' + app + ']');
    return false;
}

