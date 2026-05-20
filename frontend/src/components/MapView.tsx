import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import L from 'leaflet'
import type { Location, MowerState } from '../types'

export interface MapViewHandle {
  centerOnMower(): void
}

interface MapViewProps {
  location: Location | null
  track: [number, number][]
  mowerState: MowerState
}

const MapView = forwardRef<MapViewHandle, MapViewProps>(function MapView(
  { location, track, mowerState },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const polylineRef = useRef<L.Polyline | null>(null)
  const mowerStateRef = useRef<MowerState>(mowerState)

  function applyMarkerClass(state: MowerState) {
    if (!markerRef.current) return
    const el = markerRef.current.getElement()
    if (!el) return
    const icon = el.querySelector('.mower-icon')
    if (!icon) return
    icon.classList.toggle('running', state === 'mowing')
  }

  useEffect(() => {
    mowerStateRef.current = mowerState
    applyMarkerClass(mowerState)
  }, [mowerState])

  useImperativeHandle(ref, () => ({
    centerOnMower() {
      if (mapRef.current && markerRef.current) {
        mapRef.current.setView(
          markerRef.current.getLatLng(),
          mapRef.current.getZoom(),
          { animate: true },
        )
      }
    },
  }))

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, { zoomControl: true }).setView(
      [59.3221838, 13.4567414],
      18,
    )

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map)

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      markerRef.current = null
      polylineRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !location) return
    const latlng: L.LatLngTuple = [location.lat, location.lng]

    if (markerRef.current) {
      markerRef.current.setLatLng(latlng)
    } else {
      const icon = L.divIcon({
        className: '',
        html: '<div class="mower-icon"></div>',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      })
      markerRef.current = L.marker(latlng, { icon }).addTo(mapRef.current)
      mapRef.current.setView(latlng, 20)
      requestAnimationFrame(() => applyMarkerClass(mowerStateRef.current))
    }
  }, [location])

  useEffect(() => {
    if (!mapRef.current || track.length < 2) return

    if (polylineRef.current) {
      polylineRef.current.setLatLngs(track)
    } else {
      polylineRef.current = L.polyline(track, {
        color: '#f4d35e',
        weight: 3,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(mapRef.current)
    }
  }, [track])

  return <div ref={containerRef} className="map" />
})

export default MapView
