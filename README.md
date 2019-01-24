# Super Pixel Kit
A playground to develop kano pixel kit apps using node.

Currently supports the following drawing primitives
- Pixel
- Rectangle 
- Line
- Circle
- Ellipse
- Flood Fill
- Text
- Turtle Graphics

Before going any further note that there are a couple of command shortcuts for npm, check the `package.json` scripts section.

## Linux Setup
Checkout code and install dependencies

```
git checkout git@github.com:RuiVarela/superpixelkit.git
cd superpixelkit
npm install
```
Pixel Kit has an internal RPC code that allows you to issue the same commands on usb or wifi,   
but before you can use wifi, you need to setup it's credentials

You can connect to your device via usb and you should be able to setup your wifi credentials,  
ensure you have the correct access righs to your usb device.
```
chmod a+rw /dev/ttyUSB0 

node index.js list-devices
node index.js device-wifi /dev/ttyUSB0 HomeSweetHome WIFI_PASSWORD
```
The last command should get you the device ip   
You can now setup the device name and run an app via command line

```
node index.js device-info 192.168.1.90
node index.js device-name 192.168.1.90 Pixy
node index.js device-app 192.168.1.90 Blink
```

## Create a new app
Create a new file under the folder `apps` let's say `apps/hello.js` and create a base code similar to this

```javascript
const SuperPixelApp = require('../superpixelapp');

class Hello extends SuperPixelApp {
    constructor() {
        super({ name: "Hello", delay: 100 });
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
SuperPixelApp.register(new Hello());
```
Reference the new app in `superpixelapps.js`
```javascript
...
require('./apps/hello');
```
And now you can run it by issuing 
```
node index.js device-app 192.168.1.90 Hello
```

## Web Deploy
Super Pixel Kit apps can run from a webpage, this web page is located on the `public` folder.  

Make sure to have browserify
```
npm install -g browserify
```

Rebuild the js for the web runner
```
browserify -i serialport -i readline -g uglifyify index.web.js -o public/index.js
```
now you should be able to test the build launching the `public\index.html`

## References
- Kano Pixel Kit communication was based on [murilopolese work](https://github.com/murilopolese/kano-kits/tree/nodejs)
- Js Bresenham's line algorithm implementation was based on [www.javascriptteacher.com](http://www.javascriptteacher.com/bresenham-line-drawing-algorithm.html)
- Circle and elipse algorithms were based on [nashvail code](https://github.com/nashvail/CG-DrawingAlgorithms)
- Text Rendering based on [Jared Sanson code](https://jared.geek.nz/2014/jan/custom-fonts-for-microcontrollers)
