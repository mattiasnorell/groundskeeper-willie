# Groundskeeper Willy

Robotic lawn mower management application — live map tracking, schedule management, and manual controls.

## Stack

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI + Beanie ODM + MongoDB |
| Frontend | React + Leaflet.js |
| Message broker | MQTT (Eclipse Mosquitto) |
| Real-time | WebSockets |
| Deployment | Docker Compose |

## Quick start

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/docs
- MQTT broker: localhost:1883 (also accessible to the host for the mock)

## Development without hardware

Set up a virtual environment for the mock simulator (run once):

```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install aiomqtt
```

Activate the venv and run the mock:

```bash
source .venv/bin/activate   # Windows: .venv\Scripts\activate
python mock_esp32.py
```

The mock publishes GPS coordinates in a circular pattern every second and status updates every 5 seconds. Sending a `home` command (via the UI or API) sets the mock state to `charging`.

To target a different broker:

```bash
python mock_esp32.py --host localhost --port 1883
```

## Architecture

```
ESP32 / mock_esp32.py
    │
    │  MQTT  (mower/location, mower/status)
    ▼
Mosquitto broker
    │
    │  aiomqtt
    ▼
FastAPI backend ──► MongoDB (beanie ODM)
    │
    │  WebSocket /ws/mower
    ▼
React frontend (Leaflet map + schedule UI)
```

### MQTT topics

| Topic | Direction | Payload |
|-------|-----------|---------|
| `mower/location` | ESP32 → backend | `{"lat": float, "lng": float, "speed": float}` |
| `mower/status` | ESP32 → backend | `{"state": "mowing\|charging\|idle\|error", "battery": int}` |
| `mower/command` | backend → ESP32 | `{"command": "start\|stop\|home"}` |

### REST API

```
GET    /api/mower/status
GET    /api/mower/location
GET    /api/mower/track?session_id=<id>
POST   /api/mower/start
POST   /api/mower/stop
POST   /api/mower/home
GET    /api/schedules/
POST   /api/schedules/
PUT    /api/schedules/{id}
DELETE /api/schedules/{id}
```

Interactive docs: http://localhost:8000/docs

## Notes

### Home command

The `POST /api/mower/home` endpoint publishes `{"command": "home"}` to the `mower/command` MQTT topic. Whether the physical mower can actually navigate home depends on the ESP32 firmware and hardware (GPS + RTK or beacon-based homing). The full command pipeline is in place; verify against your specific hardware.

### Schedule timing

The schedule checker fires at the top of each minute (UTC). Schedules use 24-hour `HH:MM` times. Day names are three-letter lowercase: `mon tue wed thu fri sat sun`.

### Location TTL

`mower_locations` documents expire after 30 days via a MongoDB TTL index created automatically by Beanie on startup.
