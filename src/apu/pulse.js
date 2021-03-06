let dutyTable = [
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0],
    [1, 0, 0, 1, 1, 1, 1, 1],
];

let lengthTable = [
    10, 254, 20, 2, 40, 4, 80, 6, 160, 8, 60, 10, 14, 12, 26, 14,
    12, 16, 24, 18, 48, 20, 96, 22, 192, 24, 72, 26, 16, 28, 32, 30,
];

/**
 * The pulse channels produce a variable-width pulse signal, controlled by volume, envelope, length, and sweep units.
 * @constructor
 */
let Pulse = function (channel) {
    this.enabled = false;
    this.channel = channel;
    this.lengthEnabled = false;
    this.lengthValue = 0x00;

    this.timerPeriod = 0x0000;
    this.timerCounter = 0x0000;

    this.dutyMode = 0x00;
    this.dutyCounter = 0x00;

    this.sweepReload = false;
    this.sweepEnabled = false;
    this.sweepNegate = false;
    this.sweepShift = 0x00;
    this.sweepPeriod = 0x00;
    this.sweepCounter = 0x00;

    this.envelopeEnabled = false;
    this.envelopeLoop = false;
    this.envelopeStart = false;
    this.envelopePeriod = 0x00;
    this.envelopeCounter = 0x00;
    this.envelopeVolume = 0x00;
    this.constantVolume = 0x00;


};

Pulse.prototype = {

    /**
     * $4000 / $4004    DDLC VVVV    Duty (D), envelope loop / length counter halt (L), constant volume (C), volume/envelope (V)
     * * @param value: 8bit
     */
    writeControl: function (value) {
        /**
         * Duty (D)
         * Duty Cycle Sequences (占空比序列)
         * The width of the pulse is controlled by the duty bits in $4000/4004.
         Duty    Output waveform
         0    0 1 0 0 0 0 0 0 (12.5%)
         1    0 1 1 0 0 0 0 0 (25%)
         2    0 1 1 1 1 0 0 0 (50%)
         3    1 0 0 1 1 1 1 1 (25% negated)
         */
        this.dutyMode = (value >> 6) & 3;
        /**
         * envelope loop / length counter halt (L)
         * The length counter and envelope units are clocked by the frame counter.
         * If the envelope is not looped, the length counter must be enabled (making it redundant if longer than the envelope).
         * The envelope starts at a volume of 15 and decrements every time the unit is clocked, stopping at 0 if not looped.
         */
        this.envelopeLoop = (value & 0x20) === 0x20;
        this.lengthEnabled = (value & 0x20) === 0;
        /**
         * The channel volume is a 4-bit value that is either constant, or controlled by an envelope (chosen by $4000/4004 bit 4).
         * If using the envelope, the 4-bit value in $4000/4004 is the period of the envelope, otherwise it is the direct volume.
         */
        this.envelopeEnabled = (value & 0x10) === 0;
        if (this.envelopeEnabled === true) {
            this.envelopePeriod = value & 0b1111;
        } else {
            this.constantVolume = value & 0b1111;
        }
        // this.envelopePeriod = value & 0b1111;
        // this.constantVolume = value & 0b1111;
        this.envelopeStart = true;
    },

    /**
     * $4001 / $4005    EPPP NSSS    Sweep unit: enabled (E), period (P), negate (N), shift (S)
     * Registers $4001/4005 control the sweep unit.
     * Enabling the sweep causes the pitch to constantly rise or fall.
     * When the frequency reaches the end of the generator's range of output the channel is silenced.
     * @param value: 8bit
     */
    writeSweep: function (value) {
        this.sweepEnabled = (value & 0x80) === 0x80;
        this.sweepPeriod = ((value >> 4) & 7) + 1;
        this.sweepNegate = (value & 0x08) === 0x08;
        this.sweepShift = value & 0b111;
        this.sweepReload = true;
    },

    /**
     * $4002 / $4006    TTTT TTTT    Timer low (T)
     * The sequencer is clocked by an 11-bit timer.
     * Given the timer value t = HHHLLLLLLLL formed by timer high and timer low,
     *   this timer is updated every APU cycle (i.e., every second CPU cycle),
     *   and counts t, t-1, ..., 0, t, t-1, ..., clocking the waveform generator when it goes from 0 to t.
     * Since the period of the timer is t+1 APU cycles and the sequencer has 8 steps,
     *   the period of the waveform is 8*(t+1) APU cycles, or equivalently 16*(t+1) CPU cycles.
     * @param value: 8bit
     */
    writeTimerLow: function (value) {
        this.timerPeriod = (this.timerPeriod & 0xFF00) | value;
    },

    /**
     * $4003 / $4007    LLLL LTTT    Length counter load (L), timer high (T)
     * @param value: 8bit
     */
    writeTimerHigh: function (value) {
        this.lengthValue = lengthTable[value >> 3];
        this.timerPeriod = (this.timerPeriod & 0x00FF) | ((value & 0B111) << 8);
        this.envelopeStart = true;
        this.dutyCounter = 0;
    },

    stepTimer: function () {
        if (this.timerCounter === 0) {
            this.timerCounter = this.timerPeriod;
            this.dutyCounter = (this.dutyCounter + 1) & 7;
        } else {
            this.timerCounter--;
        }
    },

    stepEnvelope: function () {
        if (this.envelopeStart === true) {
            // Reset envelope
            this.envelopeStart = false;
            this.envelopeCounter = this.envelopePeriod;
            this.envelopeVolume = 0xF;
        } else {
            if (this.envelopeCounter > 0) {
                this.envelopeCounter--;
            } else {
                if (this.envelopeVolume > 0) {
                    this.envelopeVolume--;
                } else if (this.envelopeLoop === true) {
                    this.envelopeVolume = 0XF;
                    // this.envelopeStart = true;
                }
                this.envelopeCounter = this.envelopePeriod;
            }
        }
    },

    stepSweep: function () {
        if (this.sweepReload === true) {
            if (this.sweepEnabled === true && this.sweepCounter === 0) {
                this.sweep();
            }
            this.sweepCounter = this.sweepPeriod;
            this.sweepReload = false;
        } else {
            if (this.sweepCounter > 0) {
                this.sweepCounter--;
            } else {
                if (this.sweepEnabled === true) {
                    this.sweep();
                }
                this.sweepCounter = this.sweepPeriod;
            }
        }
    },

    /**
     * The length counter simply silences the channel when it counts down to 0.
     */
    stepLength: function () {
        if (this.lengthEnabled === true && this.lengthValue > 0) {
            this.lengthValue--;
        }
    },

    sweep: function () {
        let delta = this.timerPeriod >> this.sweepShift;
        if (this.sweepNegate === true) {
            this.timerPeriod -= delta;
            if (this.channel === 1) {
                this.timerPeriod--;
            }
        } else {
            this.timerPeriod += delta;
        }
    },

    output: function () {
        if ((!this.enabled === true)
            || this.lengthValue === 0
            || dutyTable[this.dutyMode][this.dutyCounter] === 0) {
            return 0;
        }
        if (this.timerPeriod < 8 || this.timerPeriod > 0x7FF) {
            return 0;
        }
        // if (!this.sweepNegate && this.timerPeriod + (this.timerPeriod >> this.sweepShift) > 0x7FF) {
        //     return 0;
        // }
        if (this.envelopeEnabled === true) {
            return this.envelopeVolume;
        } else {
            return this.constantVolume;
        }
    }


};
module.exports = Pulse;