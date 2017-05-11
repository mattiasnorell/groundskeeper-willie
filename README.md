# Groundskeeper Willie
## Hardware based zone selector for robot lawn mowers

### Hardware
* Raspberry Pi
* HC-SR04 Sonar
* 5V 2 Channel Relay

### Software, Raspberry
* Python 3
* rpi.gpio

### Software, Development
* Node.js
* Angular 2
* AngularFire 2
* TypeScript 2.1
* Webpack 2

### Database

| Endpoint | Description |
| ------------- |-------------|
| /zones | Get all zones |
| /schedule | Get the full schedule |
| /schedule/{id} | Update zone for a specific day |
| /position | Get the current position of the mower |
| /log | Get log feed |