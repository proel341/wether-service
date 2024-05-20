class WetherController {
    constructor(wetherService) {
        this.wetherService = wetherService;
    }

    getWetherByCoordinate({query, send, error}) {
        const {lat, lon} = query;
        console.log(lat, lon)
        if (isNaN(lat) || isNaN(lon)) {
            send("WetherController: lat and/or lon is required and shall be numeric")
            return;
        }

        this.wetherService.getWetherByCoordinate(+lat, +lon)
            .then(send, res => error(res, 400));
    }
    getMoscowWether({send, error}) {
        this.wetherService.getMoscowWether()
            .then(send, res => error(res, 400));
    }

}

module.exports = WetherController;