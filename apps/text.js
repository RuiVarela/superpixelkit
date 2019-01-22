const SuperPixelApp = require('../superpixelapp');

class Text extends SuperPixelApp {
    constructor() {
        super({ name: "Text", delay: 100 });
    }

    step() {
        let color = SuperPixelApp.rgbTo565(0, 255, 0);
        this.clear();
        //this.char('h', 0, 0, color);
        this.text('123', 0, 0, color);
        super.step();
    }
}

SuperPixelApp.register(new Text());