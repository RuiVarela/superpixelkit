const SuperPixelApp = require('../superpixelapp');

class Circles extends SuperPixelApp {
    constructor() {
        super({ name: "Circles", delay: 100 });
    }

    step() {
        this.clear(0);
        let border = SuperPixelApp.rgbTo565(200, 0, 0);

        this.circle(2, 3, 2, border);
        this.circle(15 - 2, 3, 2, border);
        this.circle(8, 3, 1, border);

        super.step();
    }
}
SuperPixelApp.register(new Circles());