const Location = require('../entities/Location');

// Types of addresses in the OpenStreetMap service suitable for the subject area
const types = ['city', 'village', 'town']

class LocationService {
    constructor(locationRepository) {
        this.locationRepository = locationRepository;
    }

    _filter_by_type(data) {
        return data.filter(addr => types.includes(addr.addresstype));
    }

    find_settlements(name) {
        return this.locationRepository.find_by_text(name)
            //.then(this._filter_by_type.bind(this))
            .then(data => {
                if (data.length === 0)
                    throw `The settlements with name ${name} not found`
                else 
                    return data.map(item => new Location(
                        item.osm_id,
                        item.addresstype,
                        item.display_name,
                        item.lat,
                        item.lon
                    ))
            })
    }

    get_location_by_coordinate(lat, lon) {
        return this.locationRepository.get_location_by_coordinate(lat, lon)
            .then(data => {
                if (!data)
                    throw `The location with coordinates (lat=${lat}, lon=${lon}) not found`;
                else {
                    let display_name = data.display_name;
                    if (data.address) {
                        if (data.address.suburb) display_name = data.address.suburb;
                        if (data.address.village) display_name = data.address.village;
                    }
                    return new Location(
                        data.osm_id,
                        data.addresstype,
                        display_name,
                        data.lat,
                        data.lon
                    )
                }
            })
    }

    get_location_by_id(id) {
        return this.locationRepository.get_location_by_id(id)
            .then(data => {
                if (data.length === 0)
                    throw `The location with id ${id} not found`;
                const placeInfo = data[0];
                return new Location(
                    placeInfo.osm_id,
                    placeInfo.addresstype,
                    placeInfo.display_name,
                    placeInfo.lat,
                    placeInfo.lon
                );
            })
    }
    
}

module.exports = LocationService;