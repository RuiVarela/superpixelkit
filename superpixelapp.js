let AppRegistry = {}
let AppActive = null
let AppTimer = null;

class SuperPixelApp {

    constructor(options) {
        this._name = options["name"];
        this._delay = 1000;

        if ("delay" in options) {
            this._delay = options["delay"];
        }

        if ("fps" in options) {
            this._delay = 1000 / options["fps"];
        }
    }

    name() {
        return this._name;
    }

    stepDelay() {
        return this._delay;
    }

    start(kit) {
        this._kit = kit;
        console.log("Start " + this.name());
    }

    stop() {
        this._kit = null;
        console.log("Stop " + this.name());
    }

    step() {
        console.log("Step " + this.name());
    }

    static register(app) {
        console.log("Registering " + app.name() + ".")
        AppRegistry[app.name()] = app;
    }

    static list() {
        let apps = Object.keys(AppRegistry);
        return apps;
    }

    static activate(kit, app) {
        if (AppActive) {
            AppActive.stop();
            clearInterval(AppTimer);
        }

        AppActive = AppRegistry[app];
        AppActive.start(kit);
        AppTimer = setInterval(() => AppActive.step(), AppActive.stepDelay());
    }
}

module.exports = SuperPixelApp
