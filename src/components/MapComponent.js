import React from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

class MapComponent extends React.Component {
   state = {
      lat: 48.8566,
      lng: 2.3522,
      zoom: 13
   };

   render() {
      let center = [this.state.lat, this.state.lng];
      // markers
      const markers = [
         {
            geocode: [48.86, 2.3522],
            popUp: "Hello, I am pop up 1"
         },
         {
            geocode: [48.85, 2.3522],
            popUp: "Hello, I am pop up 2"
         },
         {
            geocode: [48.855, 2.34],
            popUp: "Hello, I am pop up 3"
         },
      ]

      const customIcon = new Icon({
         //iconUrl: "https://cdn-icons-png.flaticon.com/128/6903/6903382.png",
         iconUrl: require('../assets/images/marker-icon.png'),
         iconSize: [38, 38] //size of the icon
      })

      const createCustomClusterIcon = (cluster) => {
         return new divIcon({
            html: `<div class="cluster-icon"></div>`
         })
      }

      return (
         <MapContainer center={center} zoom={this.state.zoom} >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup
               chunkedLoading
               iconCreateFunction={createCustomClusterIcon}
            >
               {markers.map(marker => (
                  <Marker position={marker.geocode} icon={customIcon}>
                     <Popup>
                        {marker.popUp}
                     </Popup>
                  </Marker>
               ))
               }
            </MarkerClusterGroup>
         </MapContainer>
      )
   }
}

export default MapComponent;