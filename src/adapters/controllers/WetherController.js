class WetherController {
    constructor(wetherService) {
        this.wetherService = wetherService;
    }

    getWetherByCoordinate({query, send}) {
        const {lat, lon} = query;
        console.log(lat, lon)
        if (isNaN(lat) || isNaN(lon)) {
            send("WetherController: lat and/or lon is required and shall be numeric")
            return;
        }

        this.wetherService.getWetherByCoordinate(+lat, +lon)
            .then(send, send);
    }
    getMoscowWether({send}) {
        this.wetherService.getMoscowWether()
            .then(send, send);
    }

}

module.exports = WetherController;