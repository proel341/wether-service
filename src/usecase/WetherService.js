const DayWether = require('../entities/DayWether');
const Location = require('../entities/Location');
const Temperature = require('../entities/Temperature');

class WetherService {
    constructor(wetherRepository, locationService) {
        this.wetherRepository = wetherRepository;
        this.locationService = locationService;
    }

    getWetherByCoordinate(lat, lon, time=new Date('0000T11:00:00Z')) {
        return this.locationService.get_location_by_coordinate(lat, lon).then(location => {
            return this.wetherRepository.receive(lat, lon)
                .then(data => {
                    const days = [];

                    let Ts = [];
                    let curDate = undefined;
                    data.properties.timeseries.forEach(timeseria => {
                        const t = timeseria.time.split('T');
                        if (!curDate)
                            curDate = new Date(`${t[0]}`);

                        if (curDate.getTime() !== new Date(`${t[0]}`).getTime()) {
                            days.push(new DayWether(curDate, location, [...Ts]));
                            curDate = new Date(`${t[0]}`);
                            Ts = [];
                        }

                        Ts.push(new Temperature(
                            new Date(`0000T${t[1]}`),
                            timeseria.data.instant.details.air_temperature
                        ));
                    });
                    days.push(new DayWether(curDate, location, [...Ts]));
                    return days.map(day => day.filter_temperatures_by_time(time));
                })
            })
    }

    getMoscowWether(time=new Date('0000T11:00:00Z')) {
        const Moscow_latitude = 55.72;
        const Moscow_longitude = 37.59;
        return this.getWetherByCoordinate(Moscow_latitude, Moscow_longitude, time);
    }
}

module.exports = WetherService;