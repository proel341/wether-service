# Wether-service
Данный сервис это пет проект. Сервис является fullstack приложением без базы данных.

На backend части имееются следующие endpoints:
| Endpoint                         | Comment                         |
| -------------------------------- | ------------------------------- |
| **/wether**                      |                                 |
| **/wether/moscow**               |                                 |
| **/location**                    |                                 |
| **/location/find**               |                                 |
| **/location/find_by_coordinate** |                                 |
| **/docs/**                       | *!Важно!* c **/** на конце      |
| **/client/**                     | *!Важно!* c **/** на конце      |

Более подробную документацию по endpoints можно посмотреть, запустив приложение, и перейдя по маршруту:

    http://<HOST>:<PORT>/docs/

Приложение также имеет клиентскую часть, которая доступна по адресу:

    http://<HOST>:<PORT>/client/

Приложение имеет следующие возможности:

- Возвращает температуру в Москве примерно в 14:00 на время примерно 14:00 по Москве
*(Данные взяты с yr.no)*
- Возвращает температуру в указанной точке примерно в 14:00 на время примерно 14:00 по Москве
*(Данные взяты с yr.no)*
- Возможен поиск места по названию (Данные взяты c nominatim.openstreetmap.org)
- Имеется swagger документация API (/docs/)
- Имеется клиентский интерфейс (/client/) 
- Имеется набор автоматических тестов (с использованием Jest)
- Сервис также можно использовать для прямого и обратного геокодирования (Данные взяты с nominatim.openstreetmap.org)

# Развертывание

### Клонирование репозитория с git.hub
```
    git clone https://github.com/proel341/wether-service.git
    cd wether-service
```

### Сборка docker image и запуск контейнера
Заменить < port> на нужный вам порт, например 8080.
(команды можно запускать по отдельности)
```
    docker build -t wether-service .; docker run --name wether-service-container -p<port>:8080 --rm wether-service
```
#### Запуск docker контейнера в фоновом режиме
```
    docker run --name wether-service-container -p<port>:8080 --rm -d wether-service
```

### Перезапуск контейнера
```
    docker restart wether-service-container
```

### Остановка контейнера
```
    docker stop wether-service-container
```
#### Удаление docker image
```
    docker rmi wether-service
```

### Нативный запуск приложения
Для начала отредактируйте ./src/config.js

```
    npm i
    npm run build_swagger
    npm run start
```


## Тестировние
```
    npm run test
```