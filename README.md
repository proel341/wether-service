# wether-service
Simple service to check wether location. Application is pet-project. Data receive from https://www.yt.no


## Start an app container
### Clone repository
```
    git clone https://github.com/proel341/wether-service.git
    cd wether-service
```

### Build image and start with docker
Replace < port> to port value you need.
```
    docker build -t wether-service .; docker run --name wether-service-container -p<port>:8080 --rm wether-service
```
#### Build image and start with docker demon mode
```
    docker build -t wether-service .; docker run --name wether-service-container -p<port>:8080 --rm -d wether-service
```

### Restart container
```
    docker restart wether-service-container
```

### Stop container
```
    docker stop wether-service-container
```
#### Remove docker image
```
    docker rmi wether-service
```

### Start with node
```
    npm i
    npm run start
```


## Testing

To testing with Jest run:
```
    npm run test
```

# API documentation
To see the documentations just start the project and go to http://< host>:< port>/docs/

# Warning
Possible service bug, sometimes when starting a container, outgoing requests to yr.no always exceed the timeout. It appears quite rarely.
I haven't managed to debug it yet. To fix the behavior, just restart the container or your native node app.