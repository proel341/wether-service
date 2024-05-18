class Temperature {
    constructor(time, temperature) {
        const t = time.toISOString().split('T');
        this.time = new Date(`0000T${t[1]}`);

        this.temperature = temperature;
    }
}

module.exports = Temperature;