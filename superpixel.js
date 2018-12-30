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