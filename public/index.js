(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const SuperPixelApp = require('../superpixelapp');

class Blink extends SuperPixelApp {
    constructor() {
        super({ name: "Blink", delay: 100 });
    }

    step() {

        this.clear(0);
        if (this._frame % 2 == 0) {
            let color = SuperPixelApp.rgbTo565(0, 255, 0);
            this.clear565(color);
        } else {
            this.clear();
            this.setPixel565(0, 0, SuperPixelApp.rgbTo565(255, 0, 0));
            this.setPixel565(0, 7, SuperPixelApp.rgbTo565(255, 0, 0));
            this.setPixel565(15, 0, SuperPixelApp.rgbTo565(255, 0, 0));
            this.setPixel565(15, 7, SuperPixelApp.rgbTo565(255, 0, 0));
        }

        super.step();
    }
}

SuperPixelApp.register(new Blink());
},{"../superpixelapp":17}],2:[function(require,module,exports){
const SuperPixelApp = require('../superpixelapp');

class Circles extends SuperPixelApp {
    constructor() {
        super({ name: "Circles", delay: 100 });
    }

    step() {
        this.clear(0);
        let border = SuperPixelApp.rgbTo565(200, 0, 0);

        this.circle(2, 3, 2, border);
        this.circle(15 - 2, 3, 2, border);
        this.circle(8, 3, 1, border);

        super.step();
    }
}
SuperPixelApp.register(new Circles());
},{"../superpixelapp":17}],3:[function(require,module,exports){
const SuperPixelApp = require('../superpixelapp');

class Ellipses extends SuperPixelApp {
    constructor() {
        super({ name: "Ellipses", delay: 100 });
    }

    step() {
        this.clear(0);
        let border = SuperPixelApp.rgbTo565(255, 0, 0);

        this.ellipse(8, 3, 4, 3, border);

        super.step();
    }
}
SuperPixelApp.register(new Ellipses());
},{"../superpixelapp":17}],4:[function(require,module,exports){
const SuperPixelApp = require('../superpixelapp');

class Fill extends SuperPixelApp {
    constructor() {
        super({ name: "Fill", delay: 100 });
    }

    step() {
        this.clear(0);
        let color = SuperPixelApp.rgbTo565(0, 255, 0);
        this.line(0, 0, 15, 7, color);


        color = SuperPixelApp.rgbTo565(255, 0, 0);
        this.flood(3, 0, color);

        color = SuperPixelApp.rgbTo565(0, 0, 255);
        this.flood(0, 3, color);

        super.step();
    }
}
SuperPixelApp.register(new Fill());
},{"../superpixelapp":17}],5:[function(require,module,exports){
const SuperPixelApp = require('../superpixelapp');

class Lines extends SuperPixelApp {
    constructor() {
        super({ name: "Lines", delay: 100 });
    }

    step() {
        this.clear(0);
        let color = SuperPixelApp.rgbTo565(0, 200, 0);
        this.line(0, 0, 15, 7, color);
        this.line(0, 7, 15, 0, color);

        color = SuperPixelApp.rgbTo565(0, 0, 200);
        this.line(0, 0, 15, 0, color);
        this.line(15, 0, 15, 7, color);
        this.line(15, 7, 0, 7, color);
        this.line(0, 7, 0, 0, color);

        super.step();
    }
}
SuperPixelApp.register(new Lines());
},{"../superpixelapp":17}],6:[function(require,module,exports){
const SuperPixelApp = require('../superpixelapp');

class Rectangles extends SuperPixelApp {
    constructor() {
        super({ name: "Rectangles", delay: 100 });
    }

    step() {
        this.clear(0);
        let border = SuperPixelApp.rgbTo565(200, 0, 0);
        let fill = SuperPixelApp.rgbTo565(0, 200, 0);

        this.rectangle(0, 0, 3, 3, border);
        this.rectangle(4, 4, 15, 7, border, fill);

        super.step();
    }
}
SuperPixelApp.register(new Rectangles());
},{"../superpixelapp":17}],7:[function(require,module,exports){
const SuperPixelApp = require('../superpixelapp');

class Text extends SuperPixelApp {
    constructor() {
        super({ name: "Text", delay: 100 });
    }

    step() {
        let color = SuperPixelApp.rgbTo565(0, 255, 0);
        this.clear();
        //this.char('h', 0, 0, color);
        this.text('123', 0, 0, color);
        super.step();
    }
}

SuperPixelApp.register(new Text());
},{"../superpixelapp":17}],8:[function(require,module,exports){
const SuperPixelApp = require('../superpixelapp');

class Turtle extends SuperPixelApp {
    constructor() {
        super({ name: "Turtle", delay: 100 });
    }

    step() {
        let color = SuperPixelApp.rgbTo565(0, 255, 0);
        this.clear();
        this.turtleReset();

        this.turtlePen(false);
        this.turtleForward(2);
        this.turtleLeft(90);

        this.turtlePen(true);
        this.turtleForward(5);
        this.turtleLeft(90);
        this.turtleForward(3);

        this.turtleRight(90);
        this.turtleForward(3);

        this.turtleLeft(90);
        this.turtleForward(2);

        this.turtleLeft(90);
        this.turtleForward(14);

        this.turtleLeft(90 + 45);
        this.turtleForward(7);

        this.turtleStamp();

        this.flood(1, 6, SuperPixelApp.rgbTo565(150, 150, 0));



        super.step();
    }
}

SuperPixelApp.register(new Turtle());
},{"../superpixelapp":17}],9:[function(require,module,exports){
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


},{"./superpixel":16,"./superpixelapp":17,"./superpixelapps":18}],10:[function(require,module,exports){
var v1 = require('./v1');
var v4 = require('./v4');

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;

},{"./v1":13,"./v4":14}],11:[function(require,module,exports){
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;

},{}],12:[function(require,module,exports){
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

},{}],13:[function(require,module,exports){
var rng = require('./lib/rng');
var bytesToUuid = require('./lib/bytesToUuid');

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;

},{"./lib/bytesToUuid":11,"./lib/rng":12}],14:[function(require,module,exports){
var rng = require('./lib/rng');
var bytesToUuid = require('./lib/bytesToUuid');

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

},{"./lib/bytesToUuid":11,"./lib/rng":12}],15:[function(require,module,exports){
'use strict';

module.exports = function() {
  throw new Error(
    'ws does not work in the browser. Browser clients must use the native ' +
      'WebSocket object'
  );
};

},{}],16:[function(require,module,exports){
(function (Buffer){
// based on https://github.com/KanoComputing/community-sdk
// via usb I needed to: sudo chmod a+rw /dev/ttyUSB0 

const SerialPort = require('serialport');
const WebSocket = require('ws');
const CreateInterface = require('readline').createInterface;
const uuid = require('uuid');

class SuperPixel {

    constructor(options) {
        if (!options || (!options.path && !options.ip)) {
            throw new Error('Path or ip address are required');
        }

        this.requests = {};
        this.hander = null;

        if (options.path) {
            this.path = options.path;
            this.port = new SerialPort(options.path, {
                baudRate: 115200,
                autoOpen: false
            });
            this.lineReader = CreateInterface({
                input: this.port
            });
        } else if (options.ip) {
            this.ip = options.ip;
        }
    }

    setHandler(handler) {
        this.hander = handler;
    }

    static listConnectedDevices() {
        return SerialPort.list()
            .then((ports) => {

                let possible_ports = ports.filter((port) => {
                    if (port.vendorId && port.productId) {
                        let vid = port.vendorId.toLowerCase();
                        let pid = port.productId.toLowerCase();
                        return vid == '0403' && pid == '6015';
                    }
                });

                let devices_promise = possible_ports.map((port) => {
                    let kit = new SuperPixel({
                        path: port.comName
                    });
                    return kit.connect();
                });
                return Promise.all(devices_promise);
            });
    }

    disconnect() {
        if (this.port) {
            if (this.port.isOpen) {
                this.port.close();
            }
        }

        if (this.ws) {
            if (this.ws) {
                this.ws.close();
            }
        }
    }

    connect() {
        if (this.port) {
            return new Promise((resolve, reject) => {
                this.port.on('open', (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    // Handles everything the serial port sends.
                    this.lineReader.on('line', (d) => this.handleData(d));
                    resolve(this);
                });

                this.port.open((err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                });
            });

        } else if (this.ip) {
            return new Promise((resolve, reject) => {
                this.ws = new WebSocket(`ws://${this.ip}:9998`);
                this.ws.on('open', (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    this.ws.on('message', (d) => this.handleData(d));
                    resolve(this);
                });
            });

        } else {
            console.log('No connection found');
            return Promise.reject();
        }
    }

    location() {
        if (this.path) {
            return this.path;
        } else {
            return this.ip;
        }
    }

    /**
     * Sends an RPC request to device calling for a `method` passing `params`.
     *
     * @param {String} method Which RPC method to call on the board.
     * @param {Array} params Parameters for the current method.
     * @return {Promise}
     */
    rpcRequest(method, params) {
        let request = this.getRPCRequestObject(method, params);
        let promise = this.rpcPromise(request);
        return promise;
    }

    /**
     * Creates an JSON object with an RPC request
     *
     * @param {String} method RPC method being requested
     * @param {Array} params Array of parameters to send over the RPC request
     * @return {Object}
     */
    getRPCRequestObject(method, params) {
        return {
            type: "rpc-request",
            id: uuid.v4(),
            method: method,
            params: params
        }
    }

    /**
     * Creates a promise of a RPC request that resolves when the bus emits an RPC
     * response that matches the `id` of the sent request.
     *
     * @param {Object} requestObject JSON object with the RPC request
     * @return {Promise}
     */
    rpcPromise(request) {
        let promise = new Promise((resolve, reject) => {
            this.requests[request.id] = { resolve, reject, request };
            if (this.port) {
                this.port.write(Buffer.from(JSON.stringify(request) + '\r\n'));
            } else if (this.ws) {
                this.ws.send(Buffer.from(JSON.stringify(request) + '\r\n'))
            }
        });
        return promise;
    }

    handleData(received) {
        try {
            // The data will come as a serialized/stringified json, therefore
            // we must parse it to get it's values.
            received = received.toString().trim();
            if (received.charAt(0) == "{") {
                let counter = 1;
                let position = 1;
                do {
                    if (received.charAt(position) == "{") {
                        counter++;
                    } else if (received.charAt(position) == "}") {
                        counter--;
                    }
                    ++position;
                } while (counter != 0)

                received = received.substring(0, position);
            }


            let data = JSON.parse(received);

            if (data.type == 'rpc-response') {
                let request = this.requests[data.id];

                if (request) {
                    if (data.err) {
                        request.reject(new Error(data.err));
                    } else if (data.name === 'error') {
                        request.reject(new Error(data.detail.msg));
                    } else {
                        request.resolve(data["value"]);
                    }

                    delete this.requests[data.id];
                } else {
                    console.log("request not found");
                }
            }

            if (data.type == 'event') {
                switch (data.name) {
                    case 'button-down':
                        this.onButtonDown(data.detail['button-id']);
                        break;
                    case 'button-up':
                        this.onButtonUp(data.detail['button-id']);
                        break;
                    case 'mode-change':
                        this.onDial(data.detail['mode-id']);
                        break;
                    case 'error':
                        this.onError(data.detail.msg);
                        break;
                    default:
                        this.onError(data.detail.msg);
                }
            }
        } catch (e) {
            this.onError(e.message)
        }
    }

    hexToBase64Colors(element) {
        let frameBuffer = new Buffer(element.length * 2, 0);

        element.forEach((color, index) => {
            let colorBin = new Buffer(2),
                rgb888,
                rgb565;

            if (typeof color === "string" && color.length === 7 && /#[0-9a-f]{6}/i.test(color)) {
                rgb888 = parseInt(color.substring(1, 7), 16);
                //                blue                 green                  red
                rgb565 = (rgb888 & 0xF8) >> 3 | (rgb888 & 0xFC00) >> 5 | (rgb888 & 0xF80000) >> 8;

                colorBin.writeUInt16BE(rgb565, 0);
            } else {
                // If the color is invalid, write black
                colorBin.writeUInt16BE(0x0000, 0);
            }

            colorBin.copy(frameBuffer, index * 2);
        });
        return frameBuffer.toString('base64');
    }

    //
    // commands
    //
    getDeviceInfo() {
        return this.rpcRequest('device-info', []);
    }
    setName(name) {
        return this.rpcRequest('set-name', [name]);
    }
    getName() {
        return this.rpcRequest('get-name', []);
    }
    getBatteryStatus() {
        return this.rpcRequest('battery-status', []);
    }
    getWifiStatus() {
        return this.rpcRequest('wifi-status', []);
    }
    scanWifi() {
        return this.rpcRequest('wifi-scan', []);
    }
    getLastWifiError() {
        return this.rpcRequest('wifi-last-error', []);
    }
    connectToWifi(ssid, password) {
        return this.rpcRequest('wifi-connect', [ssid, password]);
    }
    playTone(freq, duration) {
        return this.rpcRequest('play-tone', [{ freq: freq, duration: duration }]);
    }
    isPlayingTone() {
        return this.rpcRequest('is-playing-tone', []);
    }
    stopTone() {
        return this.rpcRequest('stop-tone', []);
    }
    getMicThreshold() {
        return this.rpcRequest('get-mic-threshold', []);
    }
    // `level` can be `high`, `low` and `mid` or `custom`. If it's `custom`
    // it's expected to set a `min` and a `max`.
    setMicThreshold(level, min, max) {
        if (level == 'custom') {
            return this.rpcRequest('set-mic-threshold', [{
                level: level, min: min, max: max
            }]);
        }
        return this.rpcRequest('set-mic-threshold', [{ level: level }]);
    }

    // frame must be an array with 128 hexadecimal colors prefixed with a `#`
    streamFrame(frame) {
        let encodedFrame = this.hexToBase64Colors(frame);
        let promise = this.rpcRequest('lightboard:on', [{ map: encodedFrame }]);
        return promise;
    }

    sendFrameBuffer(buffer) {
        return this.rpcRequest('lightboard:on', [{ map: buffer.toString('base64') }]);
    }

    // disableOTGControl() {}
    getAnimationConfig(modeId) {
        return this.rpcRequest('get-anim-config', [{ modeId: modeId }]);
    }
    setAnimationConfig(name, modeId, frameCount, frameRate, coverUrl) {
        return this.rpcRequest('set-anim-config', [{
            name: name,
            modeId: modeId,
            frameCount: frameCount,
            frameRate: frameRate,
            animImgUrl: coverUrl
        }]);
    }
    getMaxFrames() {
        return this.rpcRequest('get-max-frames', []);
    }
    eraseAnimation(modeId) {
        return this.rpcRequest('animation-erase', [{ modeId: modeId }]);
    }
    saveAnimationFrame(modeId, frameNumber, frame) {
        let encodedFrame = this.hexToBase64Colors(frame);
        return this.rpcRequest('animation-send-frame', [{
            modeId: modeId,
            frameNumber: frameNumber,
            map: encodedFrame
        }]);
    }

    //
    // handlers
    //
    onError(message) {
        console.log("onError: " + message);
    }

    onButtonUp(id) {
        if (this.hander) {
            this.hander.onButtonUp(id);
        }
    }

    onButtonDown(id) {
        if (this.hander) {
            this.hander.onButtonDown(id);
        }
    }

    onDial(id) {
        if (this.hander) {
            this.hander.onDial(id);
        }
    }
}

module.exports = SuperPixel
}).call(this,require("buffer").Buffer)
},{"buffer":21,"readline":19,"serialport":19,"uuid":10,"ws":15}],17:[function(require,module,exports){
(function (Buffer){
let AppRegistry = {}
let AppActive = null
let AppTimer = null;

class SuperPixelApp {
    constructor(options) {
        this._name = options["name"];
        this._delay = 1000;
        this._width = 16;
        this._height = 8;
        this._start_timestamp = 0;
        this._frame = 0;
        this._framebuffer = new Buffer(this._width * this._height * 2, 0);
        this._setupText();
        this.turtleReset();

        if ("delay" in options) {
            this._delay = options["delay"];
        }

        if ("fps" in options) {
            this._delay = 1000 / options["fps"];
        }
    }

    static time() {
        return new Date().getTime()
    }

    static hexTo565(hex) {
        let rgb888 = parseInt(hex.substring(1, 7), 16);
        let r = (rgb888 >> 16) & 0xFF;
        let g = (rgb888 >> 8) & 0xFF;
        let b = rgb888 & 0xFF;
        return SuperPixelApp.rgbTo565(r, g, b);
    }

    static rgbTo565(r, g, b) {
        //let rgb888 = SuperPixelApp.rgbTo888(r, g, b);
        //let rgb565 = (rgb888 & 0xF8) >> 3 | (rgb888 & 0xFC00) >> 5 | (rgb888 & 0xF80000) >> 8;

        r /= 256.0 - 1.0;
        g /= 256.0 - 1.0;
        b /= 256.0 - 1.0;

        r *= 32.0 - 1.0;
        g *= 64.0 - 1.0;
        b *= 32.0 - 1.0;

        r = parseInt(r, 10);
        g = parseInt(g, 10);
        b = parseInt(b, 10);

        return (b & 0x1F) | (g & 0x3F) << 5 | (r & 0x1F) << 11;
    }

    static rgbTo888(r, g, b) {
        let rgb = r;
        rgb = (rgb << 8) + g;
        rgb = (rgb << 8) + b;
        return rgb;
    }

    static radians(degrees) {
        return 2 * Math.PI * (degrees / 360);
    };

    elapsed() {
        return SuperPixelApp.time() - this._start_timestamp;
    }

    name() {
        return this._name;
    }

    stepDelay() {
        return this._delay;
    }

    start(kit) {
        this._frame = 0;
        this._start_timestamp = SuperPixelApp.time();
        this._kit = kit;
        this._kit.setHandler(this);
        console.log("Start " + this.name());
    }

    stop() {
        this._kit.setHandler(null);
        this._kit = null;
        console.log("Stop " + this.name());
    }

    step() {
        this._frame++;
        //console.log("Step " + this.name() + " " + this._frame + " " + this.elapsed());
    }

    clear565(value) {
        for (let i = 0; i < this._width * this._height; i++) {
            this._framebuffer.writeUInt16BE(value, i * 2);
        }
    }

    clear() {
        this.clear565(0);
    }

    setPixel565(x, y, rgb565) {
        if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
            return;
        }

        let offset = y * this._width + x;
        this._framebuffer.writeUInt16BE(rgb565, offset * 2);
    }

    getPixel565(x, y, rgb565) {
        let offset = y * this._width + x;
        return this._framebuffer.readUInt16BE(offset * 2);
    }

    render() {
        this.step();
        this._kit.sendFrameBuffer(this._framebuffer)
            .catch((error) => {
                console.log('sendFrameBuffer error', error.message);
            });
    }

    //
    // Events
    //
    onButtonUp(id) {
        console.log("onButtonUp: " + id);
    }

    onButtonDown(id) {
        console.log("onButtonDown: " + id);
    }

    onDial(id) {
        console.log("onDial: " + id);
    }

    //
    // Registry
    //
    static register(app) {
        console.log("Registering " + app.name() + ".")
        AppRegistry[app.name()] = app;
    }

    static list() {
        let apps = Object.keys(AppRegistry);
        return apps;
    }

    static activate(kit, app) {
        if (AppActive) {
            AppActive.stop();
            clearInterval(AppTimer);
        }

        AppActive = AppRegistry[app];
        AppActive.start(kit);
        AppActive.render();
        AppTimer = setInterval(() => AppActive.render(), AppActive.stepDelay());
    }

    //
    // Line Drawing
    //
    line(x1, y1, x2, y2, rgb565) {
        let x, y, dx, dy, dx1, dy1, px, py, xe, ye, i;
        dx = x2 - x1;
        dy = y2 - y1;

        // Create a positive copy of deltas (makes iterating easier)
        dx1 = Math.abs(dx);
        dy1 = Math.abs(dy);

        // Calculate error intervals for both axis
        px = 2 * dy1 - dx1;
        py = 2 * dx1 - dy1;

        // The line is X-axis dominant
        if (dy1 <= dx1) {

            // Line is drawn left to right
            if (dx >= 0) {
                x = x1; y = y1; xe = x2;
            } else { // Line is drawn right to left (swap ends)
                x = x2; y = y2; xe = x1;
            }

            this.setPixel565(x, y, rgb565); // Draw first pixel

            // Rasterize the line
            for (i = 0; x < xe; i++) {
                x = x + 1;

                // Deal with octants...
                if (px < 0) {
                    px = px + 2 * dy1;
                } else {
                    if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                        y = y + 1;
                    } else {
                        y = y - 1;
                    }
                    px = px + 2 * (dy1 - dx1);
                }

                // Draw pixel from line span at currently rasterized position
                this.setPixel565(x, y, rgb565);
            }

        } else { // The line is Y-axis dominant

            // Line is drawn bottom to top
            if (dy >= 0) {
                x = x1; y = y1; ye = y2;
            } else { // Line is drawn top to bottom
                x = x2; y = y2; ye = y1;
            }

            this.setPixel565(x, y, rgb565);

            // Rasterize the line
            for (i = 0; y < ye; i++) {
                y = y + 1;

                // Deal with octants...
                if (py <= 0) {
                    py = py + 2 * dx1;
                } else {
                    if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                        x = x + 1;
                    } else {
                        x = x - 1;
                    }
                    py = py + 2 * (dx1 - dy1);
                }

                // Draw pixel from line span at currently rasterized position
                this.setPixel565(x, y, rgb565);
            }
        }
    }

    //
    // Rectangle Drawing
    //
    rectangle(x1, y1, x2, y2, border565, fill565) {
        for (let x = x1; x <= x2; ++x) {
            for (let y = y1; y <= y2; ++y) {

                if (x == x1 || x == x2 || y == y1 || y == y2) {
                    this.setPixel565(x, y, border565);
                } else if (fill565) {
                    this.setPixel565(x, y, fill565);
                }
            }
        }
    }

    //
    // Circle Drawing
    //
    circle(xCenter, yCenter, radius, border565) {
        if (radius <= 0) return;

        let x = 0,
            y = radius,
            p = 1 - radius;

        // Plot first set of points
        this._circlePlotPoints(xCenter, yCenter, x, y, border565);
        while (x <= y) {
            x++;
            if (p < 0) // Mid point is inside therefore y remains same
                p += 2 * x + 1;
            else { // Mid point is outside the circle so y decreases
                y--;
                p += 2 * (x - y) + 1;
            }
            this._circlePlotPoints(xCenter, yCenter, x, y, border565);
        }
    }
    _circlePlotPoints(xCenter, yCenter, x, y, border565) {
        this.setPixel565(xCenter + x, yCenter + y, border565);
        this.setPixel565(xCenter + y, yCenter + x, border565);

        this.setPixel565(xCenter - x, yCenter + y, border565);
        this.setPixel565(xCenter - y, yCenter + x, border565);

        this.setPixel565(xCenter + x, yCenter - y, border565);
        this.setPixel565(xCenter + y, yCenter - x, border565);

        this.setPixel565(xCenter - x, yCenter - y, border565);
        this.setPixel565(xCenter - y, yCenter - x, border565);
    }

    //
    // Elipse Drawing
    //
    ellipse(xCenter, yCenter, rx, ry, border565) {
        let x, y, p, dpe, dps, dpse, d2pe, d2ps, d2pse;
        let rx2 = Math.pow(rx, 2), ry2 = Math.pow(ry, 2);
        x = 0;
        y = ry;
        p = ry2 + (rx2 * (1 - 4 * ry) - 2) / 4;
        dpe = 3 * ry2;
        d2pe = 2 * ry2;
        dpse = dpe - 2 * rx2 * (ry - 1);
        d2pse = d2pe + 2 * rx2;

        // Plot region one
        this._ellipsePlotPoints(xCenter, yCenter, x, y, border565);
        while (dpse < (2 * rx2) + (3 * ry2)) {
            if (p < 0) { // select E
                p = p + dpe;
                dpe = dpe + d2pe;
            } else {
                p = p + dpse;
                dpe = dpe + d2pe;
                dpse = dpse + d2pse;
                y--;
            }
            x++;
            this._ellipsePlotPoints(xCenter, yCenter, x, y, border565);
        }

        // Plot region 2
        // Initial values for region2
        p = p - (rx2 * (4 * y - 3) + ry2 * (4 * x + 3) + 2) / 4;
        dps = rx2 * (3 - 2 * y);
        dpse = 2 * ry2 + 3 * rx2;
        d2ps = 2 * rx2;

        while (y > 0) {
            if (p > 0) { // Select S
                p += dpe;
                dpe += d2ps;
            } else { // Select SE
                p += dpse;
                dpe += d2ps;
                dpse += d2pse;
                x++;
            }
            y--;
            this._ellipsePlotPoints(xCenter, yCenter, x, y, border565);
        }
    }
    _ellipsePlotPoints(xCenter, yCenter, x, y, border565) {
        this.setPixel565(xCenter + x, yCenter + y, border565);
        this.setPixel565(xCenter + x, yCenter - y, border565);
        this.setPixel565(xCenter - x, yCenter + y, border565);
        this.setPixel565(xCenter - x, yCenter - y, border565);
    }

    //
    // Flood Fill Drawing
    //
    flood(x, y, rgb565) {
        let test_color = this.getPixel565(x, y);
        if (test_color == rgb565) {
            return;
        }

        let stack = [];
        stack.push({ x, y });

        while (stack.length > 0) {
            let current = stack.pop();

            let pixel = this.getPixel565(current.x, current.y);
            if (pixel != test_color) {
                continue;
            }

            this.setPixel565(current.x, current.y, rgb565);

            if (current.y > 1) {
                stack.push({ x: current.x, y: current.y - 1 });
            }

            if (current.x < this._width - 1) {
                stack.push({ x: current.x + 1, y: current.y });
            }

            if (current.y < this._height - 1) {
                stack.push({ x: current.x, y: current.y + 1 });
            }

            if (current.x > 1) {
                stack.push({ x: current.x - 1, y: current.y });
            }
        }
    }

    //
    // Text Renderind
    //
    _setupText() {
        //font[96][5] 
        this._char_width = 5;
        this._char_height = 8;
        this._font = [
            [0x00, 0x00, 0x00, 0x00, 0x00], //  
            [0x2f, 0x00, 0x00, 0x00, 0x00], // !
            [0x03, 0x00, 0x03, 0x00, 0x00], // "
            [0x14, 0x3e, 0x14, 0x3e, 0x14], // #
            [0x2e, 0x6a, 0x2b, 0x3a, 0x00], // $
            [0x26, 0x12, 0x08, 0x24, 0x32], // %
            [0x1c, 0x17, 0x15, 0x34, 0x00], // &
            [0x03, 0x00, 0x00, 0x00, 0x00], // '
            [0x1e, 0x21, 0x00, 0x00, 0x00], // (
            [0x21, 0x1e, 0x00, 0x00, 0x00], // )
            [0x22, 0x08, 0x1c, 0x08, 0x22], // *
            [0x08, 0x1c, 0x08, 0x00, 0x00], // +
            [0x40, 0x20, 0x00, 0x00, 0x00], // ,
            [0x08, 0x08, 0x00, 0x00, 0x00], // -
            [0x20, 0x00, 0x00, 0x00, 0x00], // .
            [0x20, 0x10, 0x08, 0x04, 0x02], // /
            [0x3f, 0x21, 0x21, 0x3f, 0x00], // 0
            [0x01, 0x3f, 0x00, 0x00, 0x00], // 1
            [0x3d, 0x25, 0x25, 0x27, 0x00], // 2
            [0x25, 0x25, 0x25, 0x3f, 0x00], // 3
            [0x07, 0x04, 0x04, 0x3f, 0x00], // 4
            [0x27, 0x25, 0x25, 0x3d, 0x00], // 5
            [0x3f, 0x25, 0x25, 0x3d, 0x00], // 6
            [0x01, 0x39, 0x05, 0x03, 0x00], // 7
            [0x3f, 0x25, 0x25, 0x3f, 0x00], // 8
            [0x27, 0x25, 0x25, 0x3f, 0x00], // 9
            [0x28, 0x00, 0x00, 0x00, 0x00], // :
            [0x40, 0x28, 0x00, 0x00, 0x00], // ;
            [0x04, 0x0a, 0x11, 0x00, 0x00], // <
            [0x14, 0x14, 0x00, 0x00, 0x00], // =
            [0x11, 0x0a, 0x04, 0x00, 0x00], // >
            [0x01, 0x2d, 0x05, 0x07, 0x00], // ?
            [0x3f, 0x21, 0x3d, 0x25, 0x1f], // @
            [0x3f, 0x09, 0x09, 0x3f, 0x00], // A
            [0x3f, 0x25, 0x27, 0x3c, 0x00], // B
            [0x3f, 0x21, 0x21, 0x21, 0x00], // C
            [0x3f, 0x21, 0x21, 0x1e, 0x00], // D
            [0x3f, 0x25, 0x25, 0x25, 0x00], // E
            [0x3f, 0x05, 0x05, 0x05, 0x00], // F
            [0x3f, 0x21, 0x25, 0x3d, 0x00], // G
            [0x3f, 0x04, 0x04, 0x3f, 0x00], // H
            [0x21, 0x3f, 0x21, 0x00, 0x00], // I
            [0x38, 0x20, 0x21, 0x3f, 0x01], // J
            [0x3f, 0x04, 0x04, 0x3b, 0x00], // K
            [0x3f, 0x20, 0x20, 0x20, 0x00], // L
            [0x3f, 0x01, 0x3f, 0x01, 0x3f], // M
            [0x3f, 0x02, 0x04, 0x3f, 0x00], // N
            [0x3f, 0x21, 0x21, 0x3f, 0x00], // O
            [0x3f, 0x09, 0x09, 0x0f, 0x00], // P
            [0x3f, 0x21, 0x31, 0x3f, 0x00], // Q
            [0x3f, 0x09, 0x39, 0x2f, 0x00], // R
            [0x27, 0x25, 0x25, 0x3d, 0x00], // S
            [0x01, 0x01, 0x3f, 0x01, 0x01], // T
            [0x3f, 0x20, 0x20, 0x3f, 0x00], // U
            [0x0f, 0x10, 0x30, 0x1f, 0x00], // V
            [0x3f, 0x20, 0x3f, 0x20, 0x3f], // W
            [0x3b, 0x04, 0x04, 0x3b, 0x00], // X
            [0x0f, 0x08, 0x38, 0x0f, 0x00], // Y
            [0x31, 0x29, 0x25, 0x23, 0x00], // Z
            [0x3f, 0x21, 0x00, 0x00, 0x00], // [
            [0x20, 0x10, 0x08, 0x04, 0x02], // "\"
            [0x21, 0x3f, 0x00, 0x00, 0x00], // ]
            [0x02, 0x01, 0x01, 0x02, 0x00], // ^
            [0x20, 0x20, 0x00, 0x00, 0x00], // _
            [0x01, 0x02, 0x00, 0x00, 0x00], // `
            [0x38, 0x24, 0x24, 0x3c, 0x00], // a
            [0x3f, 0x24, 0x24, 0x3c, 0x00], // b
            [0x3c, 0x24, 0x24, 0x24, 0x00], // c
            [0x3c, 0x24, 0x24, 0x3f, 0x00], // d
            [0x3c, 0x2c, 0x2c, 0x2c, 0x00], // e
            [0x04, 0x3f, 0x05, 0x00, 0x00], // f
            [0xbc, 0xa4, 0xa4, 0xfc, 0x00], // g
            [0x3f, 0x04, 0x04, 0x3c, 0x00], // h
            [0x3d, 0x00, 0x00, 0x00, 0x00], // i
            [0x80, 0xfd, 0x00, 0x00, 0x00], // j
            [0x3f, 0x08, 0x08, 0x34, 0x00], // k
            [0x3f, 0x00, 0x00, 0x00, 0x00], // l
            [0x3c, 0x04, 0x3c, 0x04, 0x3c], // m
            [0x3c, 0x04, 0x04, 0x3c, 0x00], // n
            [0x3c, 0x24, 0x24, 0x3c, 0x00], // o
            [0xfc, 0x24, 0x24, 0x3c, 0x00], // p
            [0x3c, 0x24, 0x24, 0xfc, 0x00], // q
            [0x3c, 0x08, 0x04, 0x00, 0x00], // r
            [0x2c, 0x2c, 0x2c, 0x3c, 0x00], // s
            [0x04, 0x3f, 0x24, 0x00, 0x00], // t
            [0x3c, 0x20, 0x20, 0x3c, 0x00], // u
            [0x0c, 0x10, 0x30, 0x1c, 0x00], // v
            [0x3c, 0x20, 0x3c, 0x20, 0x3c], // w
            [0x34, 0x08, 0x08, 0x34, 0x00], // x
            [0xbc, 0xa0, 0xa0, 0xfc, 0x00], // y
            [0x24, 0x34, 0x2c, 0x24, 0x00], // z
            [0x04, 0x3f, 0x21, 0x00, 0x00], // {
            [0x3f, 0x00, 0x00, 0x00, 0x00], // |
            [0x21, 0x3f, 0x04, 0x00, 0x00], // }
            [0x01, 0x02, 0x02, 0x01, 0x00], // ~
            [0x00, 0x00, 0x00, 0x00, 0x00]
        ];
    }

    char(char, x, y, rgb565) {

        // Convert the character to an index
        let space = ' '.charCodeAt(0);
        char = char.charCodeAt(0);
        char = char & 0x7F;
        if (char < space) {
            char = 0;
        } else {
            char -= space;
        }


        let max_x = 0;
        let char_data = this._font[char];

        // Draw pixels
        for (let j = 0; j < this._char_width; j++) {
            let char_byte = char_data[j];

            for (let i = 0; i < this._char_height; i++) {
                if (char_byte & (1 << i)) {
                    this.setPixel565(x + j, y + i, rgb565);

                    if (max_x < j) {
                        max_x = j;
                    }
                }
            }
        }

        return max_x;
    }

    text(message, x, y, rgb565) {
        for (var i = 0; i < message.length; i++) {
            x += this.char(message.charAt(i), x, y, rgb565) + 2;
        }
    }

    //
    // Turtle Graphics
    //
    turtleReset() {
        this.turtleSet(this._width / 2, this._height / 2, 90);
        this.turtlePen(true);
        this.turtleColor565(SuperPixelApp.rgbTo565(255, 255, 255));
        return this;
    }

    turtleColor565(rgb565) {
        this._turtle_color = rgb565;
        return this;
    }

    turtlePen(down) {
        this._turtle_drawing = down;
        return this;
    }

    turtleSet(x, y, degrees) {
        this._turtle_x = x;
        this._turtle_y = y;
        this._turtle_angle = degrees;
        return this;
    }

    turtleRight(degrees) {
        this.turtleRotate(-degrees);
        return this;
    }

    turtleLeft(degrees) {
        this.turtleRotate(degrees);
        return this;
    }

    turtleRotate(degress) {
        while (degress < 0) {
            degress += 360;
        }
        this._turtle_angle = (this._turtle_angle + degress) % 360;
        return this;
    }

    turtleForward(distance) {
        let start_x = this._turtle_x;
        let start_y = this._turtle_y;
        
        this._turtle_x += Math.cos(SuperPixelApp.radians(this._turtle_angle)) * distance;
        this._turtle_y -= Math.sin(SuperPixelApp.radians(this._turtle_angle)) * distance;

        this._turtle_x = Math.round(this._turtle_x);
        this._turtle_y = Math.round(this._turtle_y)

        if (this._turtle_drawing) {
            this.line(start_x, start_y, this._turtle_x, this._turtle_y, this._turtle_color);
        }

        return this;
    }

    turtleStamp() {
        let distance = 2;
        let p0_x = this._turtle_x;
        let p0_y = this._turtle_y;

        let p1_x = p0_x + Math.cos(SuperPixelApp.radians(this._turtle_angle)) * distance;
        let p1_y = p0_y - Math.sin(SuperPixelApp.radians(this._turtle_angle)) * distance;

        p1_x = Math.round(p1_x);
        p1_y = Math.round(p1_y);

        this.line(p0_x, p0_y, p1_x, p1_y, this._turtle_color);
        this.setPixel565(p0_x, p0_y, SuperPixelApp.rgbTo565(200,0,0));
        this.setPixel565(p1_x, p1_y, SuperPixelApp.rgbTo565(0,200,0));

        return this;
    }





}

module.exports = SuperPixelApp

}).call(this,require("buffer").Buffer)
},{"buffer":21}],18:[function(require,module,exports){
require('./superpixel');
require('./superpixelapp');

require('./apps/blink');
require('./apps/lines');
require('./apps/rectangles');
require('./apps/circles');
require('./apps/ellipses');
require('./apps/fill');
require('./apps/text');
require('./apps/turtle');

},{"./apps/blink":1,"./apps/circles":2,"./apps/ellipses":3,"./apps/fill":4,"./apps/lines":5,"./apps/rectangles":6,"./apps/text":7,"./apps/turtle":8,"./superpixel":16,"./superpixelapp":17}],19:[function(require,module,exports){

},{}],20:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],21:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":20,"ieee754":22}],22:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}]},{},[9]);
