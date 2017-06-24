#!/usr/bin/env python
# -*- coding: utf-8 -*-

import RPi.GPIO as GPIO
import os.path
import datetime
import time
import config

from DistanceSensorProvider import DistanceSensorProvider

distanceSensorProvider = DistanceSensorProvider()

firebase = pyrebase.initialize_app(config.firebaseConfig)
db = firebase.database()

print "Checking if the mower is charging"


def run():
    distanceSensorProvider = DistanceSensorProvider()

    isCharging = True if distanceSensorProvider.getSensorValue().value < config.chargingDistance else False

    print(isCharging)
    
    if isCharging:
        db.child("status").update({"status": 0})
    else:
        db.child("status").update({"status": 1})

run()