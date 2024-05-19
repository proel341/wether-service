# wether-service
Simple service to check wether location. Application is pet-project. Data retriew from https://www.yt.no


## start an app container
```
    git clone https://github.com/proel341/wether-service.git
```

```
    cd wether-service
```

Replace < port> to port value you need.
```
    docker build -t wether-service .; docker run -p<port>:8080 wether-service
```