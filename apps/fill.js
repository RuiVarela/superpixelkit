const SuperPixelApp = require('../superpixelapp');

class Fill extends SuperPixelApp {
    constructor() {
        super({ name: "Fill", delay: 100 });
    }

    step() {
        this.clear(0);
        let color = SuperPixelApp.rgbTo565(0, 255, 0);
        this.line(0, 0, 15, 7, color);


        color = SuperPixelApp.rgbTo565(255, 0, 0);
        this.flood(3, 0, color);

        color = SuperPixelApp.rgbTo565(0, 0, 255);
        this.flood(0, 3, color);

        super.step();
    }
}
SuperPixelApp.register(new Fill());