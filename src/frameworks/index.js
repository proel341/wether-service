const http = require('node:http');
const querystring = require('node:querystring');

const { AppName } = require('../config');

const WetherService = require('../usecase/WetherService');
const WetherRepository = require('../adapters/repositories/WetherRepository');
const WetherController = require('../adapters/controllers/WetherController');

const wetherRepository = new WetherRepository(AppName);
const wetherService = new WetherService(wetherRepository);
const wetherController = new WetherController(wetherService);

const get_router = {
    '/wether/moscow': (...args) => wetherController.getMoscowWether(...args),
    '/wether': (...args) => wetherController.getWetherByCoordinate(...args),
}

const methods = {
    "GET": (req, res) => {
        const request_url = new URL(`http://localhost${req.url}`);
        const pathname = request_url.pathname;
        const query = querystring.parse(request_url.search.slice(1));
        const send = (arg) => res.end(JSON.stringify(arg));

        if (pathname in get_router) 
            get_router[pathname]({query, send, body: null})
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
server.listen(8080, () => console.log(
    `Сервер: ${'localhost'}:${8080} - запущен!`
));