# Groundskeeper Willie
## Hardware based zone selector for robot lawn mowers

### Hardware
* Raspberry Pi
* HC-SR04 Sonar
* 5V 2 Channel Relay

### Software
* Python 3
* rpi.gpio
* Node.js
* Sqlite3
* Angular 2
* TypeScript 2.1
* Webpack 2

### API

| Endpoint | Description |
| ------------- |-------------|
| /zone/today	| Get todays zone|
| /zone/tomorrow | Get tomorrows zone |
| /zone/{id} | Get information about a specific zone |
| /zone/{id}/update/{day} | Update the active day for zone |
| /zone/{id}/remove/{day} | Remove a specific day from the zone schedule |