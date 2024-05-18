class WetherController {
    constructor(wetherService) {
        this.wetherService = wetherService;
    }

    getWetherByCoordinate({query, send}) {
        const {lat, lon} = query;
        if (isNaN(lat) && isNaN(lon)) {
            send("Error: lat and/or lon is required and shall be numeric")
            return;
        }

        this.wetherService.getWetherByCoordinate(+lat, +lon)
            .then(send)
    }
    getMoscowWether({send}) {
        this.wetherService.getMoscowWether()
            .then(send);
    }

}

module.exports = WetherController;