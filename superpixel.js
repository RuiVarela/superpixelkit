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
        return this.rpcPromise(request);
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
        return new Promise((resolve, reject) => {
            this.requests[request.id] = { resolve, reject };

            if (this.port) {
                this.port.write(Buffer.from(JSON.stringify(request) + '\r\n'));
            } else if (this.ws) {
                this.ws.send(Buffer.from(JSON.stringify(request) + '\r\n'))
            }
        });
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
                }
            }
        } catch (e) {
            this.onError(e.message)
        }
    }


    //
    // commands
    //
    getBatteryStatus() {
        return this.rpcRequest('battery-status', []);
    }
    getWifiStatus() {
        return this.rpcRequest('wifi-status', []);
    }
    scanWifi() {
        return this.rpcRequest('wifi-scan', []);
    }
    connectToWifi(ssid, password) {
        return this.rpcRequest('wifi-connect', [ssid, password]);
    }

    //
    // handlers
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

    onError(message) {
        console.log("onError: " + message);
    }



}

module.exports = SuperPixel