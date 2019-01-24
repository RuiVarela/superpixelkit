const SuperPixelApp = require('../superpixelapp');

class Blink extends SuperPixelApp {
    constructor() {
        super({ name: "Blink", delay: 500 });
    }

    step() {

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