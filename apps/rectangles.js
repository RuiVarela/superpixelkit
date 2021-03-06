const SuperPixelApp = require('../superpixelapp');

class Rectangles extends SuperPixelApp {
    constructor() {
        super({ name: "Rectangles", delay: 100 });
    }

    step() {
        this.clear(0);
        let border = SuperPixelApp.rgbTo565(200, 0, 0);
        let fill = SuperPixelApp.rgbTo565(0, 200, 0);

        this.rectangle(0, 0, 3, 3, border);
        this.rectangle(4, 4, 15, 7, border, fill);

        super.step();
    }
}
SuperPixelApp.register(new Rectangles());