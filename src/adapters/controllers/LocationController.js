class LocationController {
    constructor(locationService) {
        this.locationService = locationService;
    }

    findLocations({query, send, error}) {
        const {name} = query;
        console.log("findLocations: ", name)
        if (typeof name !== 'string') {
            send("LocationController: name shell be string!")
            return;
        }

        this.locationService.find_settlements(name)
            .then(send, res => error(res, 400));
    }
    getLocation({query, send, error}) {
        const {id} = query;
        console.log('getLocation: ', id)
        if (isNaN(id)) {
            send("LocationController: id shell be integer!")
            return;
        }
        this.locationService.get_location_by_id(id)
            .then(send, res => error(res, 400));
    }

}

module.exports = LocationController;