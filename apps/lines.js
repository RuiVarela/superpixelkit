const SuperPixelApp = require('../superpixelapp');

class Lines extends SuperPixelApp {
    constructor() {
        super({
            name: "Lines",
            delay: 100
        });
    }

    step() {
        this.clear(0);
        let color = SuperPixelApp.rgbTo565(0, 255, 0);
        this.line(0, 0, 15, 7, color);
        this.line(0, 7, 15, 0, color);

        color = SuperPixelApp.rgbTo565(255, 0, 0);
        this.line(0, 0, 15, 0, color);
        this.line(15, 0, 15, 7, color);
        this.line(15, 7, 0, 7, color);
        this.line(0, 7, 0, 0, color);

        super.step();
    }
}
SuperPixelApp.register(new Lines());