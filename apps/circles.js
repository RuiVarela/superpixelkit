const SuperPixelApp = require('../superpixelapp');

class Circles extends SuperPixelApp {
    constructor() {
        super({ name: "Circles", delay: 100 });
    }

    step() {
        this.clear(0);
        let border = SuperPixelApp.rgbTo565(255, 0, 0);

        this.circle(8, 3, 3, border);

        super.step();
    }
}
SuperPixelApp.register(new Circles());