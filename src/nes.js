let INES = require("./ines");
let CPU = require("./cpu");
let PPU = require("./ppu");
let APU = require("./apu/apu");
let Controller = require("./controller");
let Mapper0 = require("./mapper0");
let Mapper1 = require("./mapper1");
let Mapper2 = require("./mapper2");

let NES = function () {
    this.ines = null;
    this.mapper = null;
    this.ines = new INES();
    this.cpu = new CPU(this);
    this.ppu = new PPU(this);
    this.apu = new APU(this.cpu);
    this.controller = new Array(2);
    this.controller[0] = new Controller();
    this.controller[1] = new Controller();
    this.breakPoints = [];
    this.onEndFrame = function () {
    };
};

NES.prototype = {
    reset: function () {
        this.stop();
        this.cpu.reset();
        this.ppu.reset();
    },

    load: function (data) {
        this.ines.load(data);
        this.setMapper(this.ines.mapperType);
        this.reset();
        this.isRunning = true;
    },

    // cpu step
    step: function () {
        let i;
        let cpuCycles = this.cpu.step();
        for (i = 0; i < cpuCycles * 3; i++) {
            this.ppu.step();
        }
        for (i = 0; i < cpuCycles; i++) {
            this.apu.step();
        }
        return cpuCycles;
    },

    stepFrame: function () {
        let cpuCycles = 0;
        let frame = this.ppu.frame;
        for (; frame === this.ppu.frame;) {
            cpuCycles += this.step();
        }
        this.onEndFrame(this);
        this.fpsFrameCount++;
        return cpuCycles;
    },

    stop: function () {
        if (typeof(this.frameInterval) !== "undefined" && this.frameInterval !== null) {
            clearInterval(this.frameInterval);
        }
        this.frameInterval = null;
        this.isRunning = false;
    },

    runWithBreakPoints: function (callback) {
        this.stop();
        this.isRunning = true;
        this.frameInterval = setInterval(() => {
            this.step();
            if (this.isRunning === false || this.breakPoints.indexOf(this.cpu.PC) > -1) {
                this.stop();
            }
            callback();
        }, 1000 / 60);
    },

    run: function (onEndFrame) {
        this.stop();
        this.isRunning = true;
        if (typeof(onEndFrame) === "function") {
            this.onEndFrame = onEndFrame;
        }
        this.frameInterval = setInterval(() => {
            this.stepFrame();
            if (this.isRunning === false) {
                this.stop();
            }
        }, 1000 / 60);
        setInterval(()=>{
            console.log(this.getFPS());
        }, 3000)
    },

    getFPS: function() {
        let now = +new Date();
        let fps = null;
        if (this.lastFpsTime) {
            fps = this.fpsFrameCount / ((now - this.lastFpsTime) / 1000);
        }
        this.fpsFrameCount = 0;
        this.lastFpsTime = now;
        return fps;
    },

    setMapper: function (mapperType) {
        switch (mapperType) {
            case 0:
                this.mapper = new Mapper0(this);
                break;
            case 1:
                this.mapper = new Mapper1(this);
                break;
            case 2:
                this.mapper = new Mapper2(this);
                break;
            default:
                // throw new Error("unsupported mapper " + mapperType);
        }
    }
};

module.exports = NES;