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

    getPixel565(x, y) {
        let offset = y * this._width + x;
        return this._framebuffer.readUInt16BE(offset * 2);
    }

    render() {
        this.step();

        let setup = !this._render_setup_ts || (this._render_setup_ts < SuperPixelApp.time());

        Promise.resolve()
            // .then(() => {
            //     if (setup) {

            //         return new Promise((resolve, reject) => {
            //             this._kit.requestDeviceUpdate()
            //                 .then(
            //                     () => { resolve(); },
            //                     () => { resolve(); })
            //         });
            //     }

            //     return Promise.resolve();
            // })
            .then(() => {
                if (setup) {
                    //console.log(SuperPixelApp.time());
                    this._render_setup_ts = SuperPixelApp.time() + 1000;
                    return this._kit.lightboardInit();
                }
                return Promise.resolve();
            })
            .then(() => {
                this._render_setup = false;
                return this._kit.lightboardOn(this._framebuffer);
            })
            .catch((error) => {
                console.log('render error', error.message);
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

    text(message, x, y, rgb565, fixed) {
        for (var i = 0; i < message.length; i++) {
            
            if (fixed) {
                this.char(message.charAt(i), x, y, rgb565);
                x += this._char_width;;
            } else {
                x += this.char(message.charAt(i), x, y, rgb565) + 2;
            }
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
        this.setPixel565(p0_x, p0_y, SuperPixelApp.rgbTo565(200, 0, 0));
        this.setPixel565(p1_x, p1_y, SuperPixelApp.rgbTo565(0, 200, 0));

        return this;
    }

}

module.exports = SuperPixelApp
