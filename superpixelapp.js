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
        //console.log("Step " + this.name() + " " + this._frame + " " + this.elapsed());
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
                    if ((dx < 0 && dy<0) || (dx > 0 && dy > 0)) {
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
