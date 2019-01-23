const SuperPixelApp = require('../superpixelapp');

class Turtle extends SuperPixelApp {
    constructor() {
        super({ name: "Turtle", delay: 100 });
    }

    step() {
        let color = SuperPixelApp.rgbTo565(0, 255, 0);
        this.clear();
        this.turtleReset();

        this.turtleForward(2);
        this.turtleLeft(60);
        this.turtleForward(5);
        this.turtleLeft(120);
        this.turtleForward(5);
        this.turtleStamp();

        
        super.step();
    }
}

SuperPixelApp.register(new Turtle());