'use client'
import { useEffect, useRef } from 'react'
import { Map, Marker, setWorkerUrl } from 'maplibre-gl'
import { useField } from '@payloadcms/ui'
import 'maplibre-gl/dist/maplibre-gl.css'

setWorkerUrl(new URL('maplibre-gl/dist/maplibre-gl-worker.mjs', import.meta.url).toString())

export default function LocationPicker({ path }: { path: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<Marker | null>(null)

  const parentPath = path.replace(/\.picker$/, '')
  const { value: latitude, setValue: setLatitude } = useField<number | null>({
    path: `${parentPath}.latitude`,
  })
  const { value: longitude, setValue: setLongitude } = useField<number | null>({
    path: `${parentPath}.longitude`,
  })

  useEffect(() => {
    if (!containerRef.current) return

    const hasLocation = typeof latitude === 'number' && typeof longitude === 'number'

    const map = new Map({
      container: containerRef.current,
      center: hasLocation ? [longitude, latitude] : [4.428125994059443, 51.22923603167069],
      zoom: 15,
      style: 'https://tiles.openfreemap.org/styles/liberty',
    })

    if (hasLocation) {
      markerRef.current = new Marker({ draggable: true })
        .setLngLat([longitude, latitude])
        .addTo(map)
    }

    const saveMarkerPosition = () => {
      const point = markerRef.current?.getLngLat()
      if (point) {
        setLongitude(point.lng)
        setLatitude(point.lat)
      }
    }

    markerRef.current?.on('dragend', saveMarkerPosition)

    map.on('click', (event) => {
      const { lng, lat } = event.lngLat

      if (!markerRef.current) {
        markerRef.current = new Marker({ draggable: true }).setLngLat([lng, lat]).addTo(map)
        markerRef.current.on('dragend', saveMarkerPosition)
      } else {
        markerRef.current.setLngLat([lng, lat])
      }

      setLongitude(lng)
      setLatitude(lat)
    })

    return () => {
      markerRef.current = null
      map.remove()
    }
    // Initialize the map once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="c-map"
      ref={containerRef}
      style={{
        width: '100%',
        height: 400,

        overflow: 'hidden',
      }}
    />
  )
}
