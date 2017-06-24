#!/usr/bin/env python
# -*- coding: utf-8 -*- 
import os.path
import RPi.GPIO as GPIO
import time
import pyrebase
import config

from DistanceSensorProvider import DistanceSensorProvider

distanceSensorProvider = DistanceSensorProvider()

firebase = pyrebase.initialize_app(config.firebaseConfig)
db = firebase.database()

def change(pin, mode):

	GPIO.setmode(GPIO.BCM)
	GPIO.setwarnings(False)

	GPIO.setup(pin, GPIO.OUT)
    GPIO.output(pin, mode)

def getDayConfiguration(dayNumber):
    dayConfig = db.child("schedule").order_by_child("day").start_at(dayNumber).end_at(dayNumber).get()
    print dayConfig

    return dayConfig

def getZoneConfigurations():
    zones = db.child("zones").get()
    print zones

    return zones

def setActiveZone():
    IsCharging = True if distanceSensorProvider.getSensorValue().value < config.chargingDistance else False

    if IsCharging:
        currentDayNumber = datetime.datetime.today().weekday()
        dayConfig = getDayConfiguration(currentDayNumber)
        zoneConfigurations = getZoneConfigurations(dayConfig)

        for zone in zoneConfigurations
            mode = GPIO.HIGH if zone.zoneId == dayConfig.zoneId else GPIO.LOW

            change(zone.zoneId, mode)
            time.sleep(1)

setActiveZone()