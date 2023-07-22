import { useLeafletContext } from '@react-leaflet/core'
import L from 'leaflet'
import { useEffect } from 'react'
import { MapContainer, TileLayer } from "react-leaflet";


function Square(props) {
  const context = useLeafletContext()

  useEffect(() => {
    const bounds = L.latLng(props.center).toBounds(props.size)
    const square = new L.Rectangle(bounds)
    const container = context.layerContainer || context.map
    container.addLayer(square)

    return () => {
      container.removeLayer(square)
    }
  })

  return null
}

const center = [51.505, -0.09]

function MyMap() {
  return (
    <MapContainer center={center} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Square center={center} size={1000} />
    </MapContainer>
  )
}

export default MyMap