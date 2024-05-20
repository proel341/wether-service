const MAX_WAIT_TIME = 5000;
const url = 'https://nominatim.openstreetmap.org/';

class LocationRepository {
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
                err: 'LocationRepository: rps limit exceeded, try again leter!',
                args: arguments
            });

        this.req_counter++;
    }

    find_by_text(text) {
        return new Promise((res, rej) => {
            this._rps_control(rej);
            const signal = AbortSignal.timeout(MAX_WAIT_TIME);

            fetch(`${url}/search?q=${text} Russia&format=jsonv2`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': this.AppName,
                },
                signal
            }).then(data => {
                if (data.status === 200)
                    data.json().then(res);
                else 
                    rej(`LocationRepository: ${data.statusText} ${data.status}`);
            }).catch(err => {
                rej("LocationRepository: Timeout error ")
                console.log(err);
            })
        });
    }

    get_location_by_id(id) {
        return new Promise((res, rej) => {
            this._rps_control(rej);
            const signal = AbortSignal.timeout(MAX_WAIT_TIME);

            fetch(`${url}/lookup?osm_ids=R${id}&format=jsonv2`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': this.AppName,
                },
                signal
            }).then(data => {
                if (data.status === 200){
                    data.json().then(res);
                }
                else 
                    rej(`LocationRepository: ${data.statusText} ${data.status}`);
            }).catch(err => {
                rej("LocationRepository: Timeout error ")
                console.log(err);
            })
        });
    }
}

module.exports = LocationRepository;