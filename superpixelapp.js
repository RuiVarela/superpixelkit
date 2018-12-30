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
        this._framebuffer_changed = false;

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
        console.log("Step " + this.name() + " " + this._frame + " " + this.elapsed());
    }

    static rgbTo888(r, g, b) {
        let rgb = r;
        rgb = (rgb << 8) + g;
        rgb = (rgb << 8) + b;
        return rgb;
    }

    static rgbTo565(r, g, b) {
        let rgb888 = SuperPixelApp.rgbTo888(r, g, b);
        let rgb565 = (rgb888 & 0xF8) >> 3 | (rgb888 & 0xFC00) >> 5 | (rgb888 & 0xF80000) >> 8;
        return rgb565;
    }

    clear565(value) {
        for (let i = 0; i < this._width * this._height; i++) {
            this._framebuffer.writeUInt16BE(value, i * 2);
        }
        this._framebuffer_changed = true;
    }

    clear() {
        this.clear565(0);
    }

    setPixelHex(x, y, color) {
        let rgb888 = parseInt(color.substring(1, 7), 16);
        this.setPixel(rgb888);
    }

    setPixel(x, y, rgb888) {
        //            blue                   green                    red
        let rgb565 = (rgb888 & 0xF8) >> 3 | (rgb888 & 0xFC00) >> 5 | (rgb888 & 0xF80000) >> 8;
        this.setPixel565(x, y, rgb565);
    }

    setPixel565(x, y, rgb565) {
        let offset = y * this._width + x;
        this._framebuffer.writeUInt16BE(rgb565, offset * 2);
        this._framebuffer_changed = true;
    }

    render() {
        this.step();
        if (this._framebuffer_changed) {
            this._kit.sendFrameBuffer(this._framebuffer)
                .catch((error) => {
                    console.log('sendFrameBuffer error', error.message);
                });
            this._framebuffer_changed = false;
        }
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
}

module.exports = SuperPixelApp
