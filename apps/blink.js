const SuperPixelApp = require('../superpixelapp');

class Blink extends SuperPixelApp {
    constructor() {
        super({
            name: "Blink",
            delay: 3000
        })
    }
}

SuperPixelApp.register(new Blink());