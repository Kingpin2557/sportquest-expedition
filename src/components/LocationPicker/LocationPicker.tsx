'use client'

import { useEffect, useRef } from 'react'
import { Map, Marker, setWorkerUrl } from 'maplibre-gl'
import { useField } from '@payloadcms/ui'
import 'maplibre-gl/dist/maplibre-gl.css'

setWorkerUrl(new URL('maplibre-gl/dist/maplibre-gl-worker.mjs', import.meta.url).toString())

const DEFAULT_CENTER: [number, number] = [4.428125994059443, 51.22923603167069]

function toCoordinate(value: unknown): number | null {
  if (value === '' || value === null || value === undefined) return null

  const number = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(number) ? number : null
}

export default function LocationPicker() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map | null>(null)
  const markerRef = useRef<Marker | null>(null)

  const { value: latitude, setValue: setLatitude } = useField<number | null>({
    path: 'latitude',
  })

  const { value: longitude, setValue: setLongitude } = useField<number | null>({
    path: 'longitude',
  })

  // Keep the latest setters available to map event handlers.
  const settersRef = useRef({ setLatitude, setLongitude })
  settersRef.current = { setLatitude, setLongitude }

  // Create the map once.
  useEffect(() => {
    if (!containerRef.current) return

    const map = new Map({
      container: containerRef.current,
      center: DEFAULT_CENTER,
      zoom: 15,
      style: 'https://tiles.openfreemap.org/styles/liberty',
    })

    mapRef.current = map

    const handleMapClick = (event: { lngLat: { lng: number; lat: number } }) => {
      settersRef.current.setLongitude(event.lngLat.lng)
      settersRef.current.setLatitude(event.lngLat.lat)
    }

    map.on('click', handleMapClick)

    return () => {
      map.off('click', handleMapClick)
      markerRef.current?.remove()
      markerRef.current = null
      mapRef.current = null
      map.remove()
    }
  }, [])

  // Update the marker/map when the Payload coordinate fields change.
  useEffect(() => {
    const lat = toCoordinate(latitude)
    const lng = toCoordinate(longitude)
    const map = mapRef.current

    if (lat === null || lng === null || !map) return

    const position: [number, number] = [lng, lat]

    if (!markerRef.current) {
      const marker = new Marker({ draggable: true }).setLngLat(position).addTo(map)

      marker.on('dragend', () => {
        const point = marker.getLngLat()
        settersRef.current.setLongitude(point.lng)
        settersRef.current.setLatitude(point.lat)
      })

      markerRef.current = marker
    } else {
      markerRef.current.setLngLat(position)
    }

    map.easeTo({ center: position })
  }, [latitude, longitude])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: 400,
        overflow: 'hidden',
      }}
    />
  )
}
