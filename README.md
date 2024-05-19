# wether-service
Simple service to check wether location. Application is pet-project. Data receive from https://www.yt.no


## Start an app container
```
    git clone https://github.com/proel341/wether-service.git
```

```
    cd wether-service
```

### Start with docker
Replace < port> to port value you need.
```
    docker build -t wether-service .; docker run -p<port>:8080 --rm wether-service
```
#### Start with demon mode
```
    docker build -t wether-service .; docker run -p<port>:8080 --rm -d wether-service
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