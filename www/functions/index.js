const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.scheduleUpdated = functions.database.ref('/schedule').onWrite(event => {
    var eventSnapshot = event.data;
    var logItem = {
        timestamp: new Date().getTime(),
        message: "Schemat uppdaterades"
    };

    admin.database().ref('/log').push(logItem).then(snapshot => { });
});

exports.statusUpdated = functions.database.ref('/status').onWrite(event => {
    var logItem = {};
    logItem.timestamp = new Date().getTime();
    logItem.message = event.data.val().status == 0 ? "Laddar" : "Ute och kör";
    
    admin.database().ref('/log').push(logItem).then(snapshot => { });
});