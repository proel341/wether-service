const MAX_WAIT_TIME = 2000;
const url = 'https://api.met.no/weatherapi/locationforecast/2.0/compact';

class WetherRepository {
    constructor(app_name, rps=20) {
        this.AppName = app_name;
        this.rps = Math.trunc(rps * 0.9);
        this.req_counter = 0;
        this.request_time = -1;
    }

    _rps_control(reject) {
        const time = Date.now();
        if (time - this.request_time > 1000){
            this.request_time = time;
            this.req_counter = 0;
        }

        else if (this.req_counter >= this.rps) 
            reject({
                code: -1,
                err: 'WetherRepository: rps limit exceeded, try again leter!',
                args: arguments
            });

        this.req_counter++;
    }

    receive(latitude, longitude) {
        return new Promise((res, rej) => {
            this._rps_control(rej);           

            const signal = AbortSignal.timeout(MAX_WAIT_TIME);

            const lat = latitude.toFixed(4);
            const lon = longitude.toFixed(4);
            fetch(`${url}?lat=${lat}&lon=${lon}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': this.AppName,
                },
                signal,
            }).then(data => data.json())
                .then(res)
                .catch(rej)
        });
    }
}

module.exports = WetherRepository;