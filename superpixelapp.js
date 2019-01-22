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
        let g = (rgb888 >> 8 ) & 0xFF;
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
        stack.push({x,y});

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
}

module.exports = SuperPixelApp
