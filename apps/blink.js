const SuperPixelApp = require('../superpixelapp');

class Blink extends SuperPixelApp {
    constructor() {
        super({
            name: "Blink",
            delay: 1000
        });
    }

    step() {

        this.clear(0);
        if (this._frame % 2 == 0) {
            let color = SuperPixelApp.rgbTo565(255, 255, 255);
            this.clear565(color);
        } else {
            this.clear();

            this.setPixel(0, 0, SuperPixelApp.rgbTo888(255, 0, 0));
            this.setPixel(0, 7, SuperPixelApp.rgbTo888(255, 0, 0));
            this.setPixel(15, 0, SuperPixelApp.rgbTo888(255, 0, 0));
            this.setPixel(15, 7, SuperPixelApp.rgbTo888(255, 0, 0));
        }

        super.step();
    }
}

SuperPixelApp.register(new Blink());