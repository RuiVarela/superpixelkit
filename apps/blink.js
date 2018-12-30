const SuperPixelApp = require('../superpixelapp');

class Blink extends SuperPixelApp {
    constructor() {
        super({
            name: "Blink",
            delay: 100
        });
    }

    step() {
        let color = SuperPixelApp.rgbTo565(0, 0, 255);
        //this.clear565(color);
        this.clear();

        color = SuperPixelApp.rgbTo888(255, 0, 0);
        this.setPixel(this._frame % 16,0, color);

        super.step();
    }
}

SuperPixelApp.register(new Blink());