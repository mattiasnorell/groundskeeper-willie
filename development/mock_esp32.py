#!/usr/bin/env python3
"""
Mock ESP32 for development without physical hardware.

Simulates:
- GPS coordinates in a circular mowing pattern
- Battery drain
- Status updates every 5 seconds
- Responding to home command by switching to "charging"

Usage:
    pip install aiomqtt
    python mock_esp32.py [--host localhost] [--port 1883]
"""
import argparse
import asyncio
import json
import math
import random
import time

import aiomqtt

# Adjust to a real lawn centre coordinate for map testing
CENTER_LAT = 59.322184
CENTER_LNG = 13.456741
RADIUS_DEG = 0.00030   # ~30 m radius

state = "mowing"
battery = 100.0


async def publisher(client: aiomqtt.Client):
    global state, battery
    angle = 0.0
    last_status = 0.0

    while True:
        lat = CENTER_LAT + RADIUS_DEG * math.cos(math.radians(angle))
        lng = CENTER_LNG + RADIUS_DEG * math.sin(math.radians(angle))
        angle = (angle + 2) % 360
        battery = max(0.0, battery - 0.04)

        await client.publish(
            "mower/location",
            json.dumps({"lat": round(lat, 6), "lng": round(lng, 6), "speed": round(random.uniform(0.3, 0.8), 2)}),
        )
        print(f"[LOC]    lat={lat:.6f}  lng={lng:.6f}  angle={angle:.0f}°")

        now = time.monotonic()
        if now - last_status >= 5:
            last_status = now
            await client.publish(
                "mower/status",
                json.dumps({"state": state, "battery": int(battery)}),
            )
            print(f"[STATUS] state={state}  battery={int(battery)}%")

        await asyncio.sleep(10)


async def command_listener(client: aiomqtt.Client):
    global state, battery
    async for message in client.messages:
        if str(message.topic) != "mower/command":
            continue
        try:
            payload = json.loads(message.payload.decode())
            cmd = payload.get("command")
            print(f"[CMD]    received → {cmd}")
            if cmd == "home":
                state = "charging"
                battery = min(100.0, battery + 0.5)
            elif cmd == "start":
                state = "mowing"
            elif cmd == "stop":
                state = "idle"
        except Exception as exc:
            print(f"[ERR]    {exc}")


async def main(host: str, port: int):
    print(f"Connecting to MQTT broker at {host}:{port}")
    while True:
        try:
            async with aiomqtt.Client(host, port) as client:
                await client.subscribe("mower/command")
                print("Connected. Publishing mock data…")
                await asyncio.gather(publisher(client), command_listener(client))
        except Exception as exc:
            print(f"[ERR] {exc} – reconnecting in 3s")
            await asyncio.sleep(3)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Mock ESP32 lawn mower")
    parser.add_argument("--host", default="localhost")
    parser.add_argument("--port", type=int, default=1883)
    args = parser.parse_args()
    asyncio.run(main(args.host, args.port))
