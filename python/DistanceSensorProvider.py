#!/usr/bin/env python
# -*- coding: utf-8 -*- 
from DistanceSensorValue import DistanceSensorValue
import os.path

class DistanceSensorProvider:
	
	def __init__(self):
        print("Distance sensor init")

        GPIO.setmode(GPIO.BCM)
        GPIO_TRIGGER = 22
        GPIO_ECHO    = 24
        GPIO.setup(GPIO_TRIGGER,GPIO.OUT)
        GPIO.setup(GPIO_ECHO,GPIO.IN)
        GPIO.output(GPIO_TRIGGER, False)

	def getSensorValue(self):

        numberOfPings = 10
        pingInterval = 1
        result = 0

        time.sleep(0.5)

        for num in range(0, numberOfPings):
            print "Ping " + str(num + 1)

            GPIO.output(GPIO_TRIGGER, True)
            time.sleep(0.001)
            GPIO.output(GPIO_TRIGGER, False)
            start = time.time()

            while GPIO.input(GPIO_ECHO)==0:
                start = time.time()

            while GPIO.input(GPIO_ECHO)==1:
                stop = time.time()

            elapsed = stop-start

            distance = (elapsed * 34300) / 2
            
            result = result + float(distance)

            time.sleep(pingInterval)


        endResult = result / numberOfPings
        
        print "Result: " + str(endResult)

        GPIO.cleanup()
		
        return DistanceSensorValue(endResult)