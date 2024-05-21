const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const querystring = require('node:querystring');

const { AppName, Port } = require('../config');

const StaticServer = require('./static_server');

const LocationRepository = require('../adapters/repositories/LocationRepository');
const LocationService = require('../usecase/LocationService');
const LocationController = require('../adapters/controllers/LocationController');

const WetherService = require('../usecase/WetherService');
const WetherRepository = require('../adapters/repositories/WetherRepository');
const WetherController = require('../adapters/controllers/WetherController');

const staticServer = new StaticServer(fs, path);

const locationRepository = new LocationRepository(AppName);
const locationService = new LocationService(locationRepository);
const locationController = new LocationController(locationService);

const wetherRepository = new WetherRepository(AppName);
const wetherService = new WetherService(wetherRepository, locationService);
const wetherController = new WetherController(wetherService);

// API routes
const get_router = {
    '/wether/moscow': (...args) => wetherController.getMoscowWether(...args),
    '/wether': (...args) => wetherController.getWetherByCoordinate(...args),
    '/location/find': (...args) => locationController.findLocations(...args),
    '/location': (...args) => locationController.getLocation(...args),
    '/location/find_by_coordinate': (...args) => locationController.getLocationByCoordinate(...args),
}

const methods = {
    "GET": (req, res) => {
        const request_url = new URL(`http://localhost${req.url}`);
        const pathname = request_url.pathname;
        const query = querystring.parse(request_url.search.slice(1));
        const send = (arg) => { 
            res.writeHead(200, { 
                "Content-Type": 'application/json',
                "Access-Control-Allow-Origin": '*',
            });
            res.end(JSON.stringify(arg))
        }
        const error = (arg, code) => { 
            res.writeHead(code, {
                "Content-Type": 'application/json',
                "Access-Control-Allow-Origin": '*',
            })
            res.end(JSON.stringify(arg))
        }

        // Swagger static serving
        if (req.url.startsWith('/docs/')) {
            staticServer.serve(req, res);
        }
        // Client static serving
        else if (req.url.startsWith('/client/')) {
            staticServer.serve(req, res);
        }

        // API
        else if (pathname in get_router) 
            get_router[pathname]({query, send, body: null, error})
    }
}

const server = http.createServer((req, res) => {
    if (req.method in methods)
        methods[req.method](req, res);
    else {
        res.writeHead(404);
        res.end();
    }
});
server.listen(Port, () => console.log(
    `Сервер: ${'localhost'}:${Port} - запущен!`
));