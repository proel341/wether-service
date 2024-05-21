const WetherRepository = require('../WetherRepository');

//class LocationRepository {
//    constructor(app_name, rps=20) {
//        this.AppName = app_name;
//        this.rps = Math.trunc(rps * 0.9);
//        this.req_counter = 0;
//        this.request_time = -1;
//    }
//
//    _rps_control(reject) {
//        const time = Date.now();
//        if (time - this.request_time > 1000){
//            this.request_time = time;
//            this.req_counter = 0;
//        }
//
//        else if (this.req_counter >= this.rps) 
//            reject({
//                code: -1,
//                err: 'LocationRepository: rps limit exceeded, try again leter!',
//                args: arguments
//            });
//
//        this.req_counter++;
//    }

describe(`Test the query rate limiting function 
(The function slightly underestimates the given rps. 
Namely by 10%. This is done for more confidence.)`, () => {
    test('acceptable rps', async () => {
        const wetherRepository = new WetherRepository('Test');
        const request = () => new Promise((res, rej) => {
            wetherRepository._rps_control(rej);
            res(1);
        }).catch(() => -1);
        let [success, fail] = [0, 0];
        const promises = [];

        for (const i of [...Array(18).keys()]) {
            promises.push(request().then(res => {
                if (res === 1) success++;
                else fail++;
                return 0;
            }))
        }
        const end = await Promise.all(promises);

        expect([success, fail].toString()).toBe('18,0');
    })

    test('exceeded rps', async () => {
        const wetherRepository = new WetherRepository('Test');
        const request = () => new Promise((res, rej) => {
            wetherRepository._rps_control(rej);
            res(1);
        }).catch(() => -1);
        let [success, fail] = [0, 0];
        const promises = [];

        for (const i of [...Array(30).keys()]) {
            promises.push(request().then(res => {
                if (res === 1) success++;
                else fail++;
                return 0;
            }))
        }
        const end = await Promise.all(promises);

        expect([success, fail].toString()).toBe('18,12');
    })

    test('Many requests with delays', async () => {
        const wetherRepository = new WetherRepository('Test');
        const request = () => new Promise((res, rej) => {
            wetherRepository._rps_control(rej);
            res(1);
        }).catch(() => -1);
        const sleep = (time) => new Promise(res => setTimeout(() => {
           res(1) 
        }, time))

        let [success, fail] = [0, 0];
        const promises = [];
        let trash;

        for (const i of [...Array(30).keys()]) {
            promises.push(request().then(res => {
                if (res === 1) success++;
                else fail++;
                return 0;
            }))
        }
        
        trash = await sleep(1000);

        for (const i of [...Array(30).keys()]) {
            promises.push(request().then(res => {
                if (res === 1) success++;
                else fail++;
                return 0;
            }))
        }

        trash = await sleep(1000);

        for (const i of [...Array(30).keys()]) {
            promises.push(request().then(res => {
                if (res === 1) success++;
                else fail++;
                return 0;
            }))
        }

        const end = await Promise.all(promises);

        expect([success, fail].toString()).toBe('54,36');
    })
})