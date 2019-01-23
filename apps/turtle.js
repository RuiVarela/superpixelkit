const SuperPixelApp = require('../superpixelapp');

class Turtle extends SuperPixelApp {
    constructor() {
        super({ name: "Turtle", delay: 100 });
    }

    step() {
        let color = SuperPixelApp.rgbTo565(0, 255, 0);
        this.clear();
        this.turtleReset();

        this.turtlePen(false);
        this.turtleForward(2);
        this.turtleLeft(90);

        this.turtlePen(true);
        this.turtleForward(5);
        this.turtleLeft(90);
        this.turtleForward(3);

        this.turtleRight(90);
        this.turtleForward(3);

        this.turtleLeft(90);
        this.turtleForward(2);

        this.turtleLeft(90);
        this.turtleForward(14);

        this.turtleLeft(90 + 45);
        this.turtleForward(7);

        this.turtleStamp();

        this.flood(1, 6, SuperPixelApp.rgbTo565(150, 150, 0));



        super.step();
    }
}

SuperPixelApp.register(new Turtle());