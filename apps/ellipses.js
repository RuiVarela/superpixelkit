const SuperPixelApp = require('../superpixelapp');

class Ellipses extends SuperPixelApp {
    constructor() {
        super({ name: "Ellipses", delay: 100 });
    }

    step() {
        this.clear(0);
        let border = SuperPixelApp.rgbTo565(255, 0, 0);

        this.ellipse(8, 3, 5, 3, border);

        super.step();
    }
}
SuperPixelApp.register(new Ellipses());