const SuperPixelApp = require('../superpixelapp');

class Time extends SuperPixelApp {
    constructor() {
        super({ name: "Time", delay: 200 });
    }

    step() {
        let color = SuperPixelApp.rgbTo565(0, 255, 0);
        this.clear();

        let string = new Date().toLocaleTimeString();
        let index = Math.round(this.elapsed() / 200);
        index = index  % (string.length * this._char_width + 16);

        //this.char('h', 0, 0, color);
        this.text(string, -index + 16, 0, color, true);
        super.step();
    }
}

SuperPixelApp.register(new Time());