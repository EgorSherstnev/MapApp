import React from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
//import "leaflet/dist/leaflet.css"
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Basemap from "./Basemaps";

class MapComponent extends React.Component {
   state = {
      lat: 48.8566,
      lng: 2.3522,
      zoom: 13,
      basemap: 'osm',
   };

   onBMChange = (bm) => {
      this.setState({
         basemap: bm
      })
   }

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

      //basemap
      const basemapsDict = {
         osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
         hot: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
         dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
      }

      const customIcon = new Icon({
         //iconUrl: "https://cdn-icons-png.flaticon.com/128/6903/6903382.png",
         iconUrl: require('../assets/images/marker-icon.png'),
         iconSize: [38, 38] //size of the icon
      })

      const createCustomClusterIcon = (cluster) => {
         return new divIcon({
            html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
            className: "custom-marker-cluster",
            iconSize: point(33, 33, true)
         })
      }

      return (
         <MapContainer center={center} zoom={this.state.zoom} >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url={basemapsDict[this.state.basemap]}
            />

            <Basemap basemap={this.state.basemap} onChange={this.onBMChange}/>

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