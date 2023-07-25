import React from "react";
import { 
  MapContainer, 
  Marker, 
  TileLayer, 
  Popup, 
  ZoomControl, 
  VideoOverlay  } from "react-leaflet";
//import "leaflet/dist/leaflet.css"
import { Icon, divIcon, point } from "leaflet";
import Basemap from "./Basemaps";
import GeojsonLayer from '../layers/GeojsonLayerFunc';
import VelocityLayer from "../layers/VelocityLayer";
import CoordInsert from "./CoordInsert";
import { connect } from "react-redux";

class MapComponent extends React.Component {
   state = {
      lat: 55.702868,
      lng: 37.530865,
      zoom: 13,
      basemap: 'osm',

      geojsonVisible: false,
   };

   onCoordInsertChange = (lat, long, z) => {
      this.setState({
         lat: lat,
         lng: long,
         zoom: z,
      });
   }

   onBMChange = (bm) => {
      this.setState({
         basemap: bm
      })
   }

   onGeojsonToogle = (e) => {
      this.setState({
         geojsonVisible: e.currentTarget.checked
      })
   }

   render() {
      let center = [this.state.lat, this.state.lng];
      // markers
      const markers = [
         {
            geocode: [55.70, 37.530865],
            popUp: "Hello, I am pop up 1"
         },
         {
            geocode: [55.67, 37.530865],
            popUp: "Hello, I am pop up 2"
         },
         {
            geocode: [55.675, 37.520865],
            popUp: "Hello, I am pop up 3"
         },
      ]

      const layersTypes = {
        'geojson': GeojsonLayer,
        'velocityLayer': VelocityLayer,
        'videoOverlay': VideoOverlay
      }

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
         <MapContainer 
          key={`${this.state.lat}-${this.state.lng}-${this.state.zoom}`} 
          zoomControl={false} 
          center={center} 
          zoom={this.state.zoom} 
          minZoom={2} 
          className="map"
         >

            <ZoomControl position={'bottomright'} />

            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url={basemapsDict[this.state.basemap]}
            />

            <Basemap basemap={this.state.basemap} onChange={this.onBMChange}/>

            {this.props.layers.map( l => {
            if (l.visible) {
              let LayerComp = layersTypes[l.type];
              return (
                <LayerComp key={l.id} {...l.options}/>
              )
            }
          })}


            <div className="geojson-toggle">
               <label htmlFor="layertoggle">Toggle Geojson </label>
               <input type="checkbox"
                  name="layertoggle"
                  id="layertoggle"
                  value={this.state.geojsonVisible}
                  onChange={this.onGeojsonToogle}
               />
            </div>

            {this.state.geojsonVisible && 
               <GeojsonLayer url="places.json" cluster={false}/>
            }


               <CoordInsert 
                lat={this.state.lat}
                long={this.state.lng}
                zoom={this.state.zoom}
                onllzChange={this.onCoordInsertChange}
               />

                  <Marker position={center} icon={customIcon}>
                     <Popup>
                        Широта: {this.state.lat}<br/> 
                        Долгота: {this.state.lng}<br/> 
                        Масштаб: {this.state.zoom}
                     </Popup>
                  </Marker>

         </MapContainer>
      )
   }
}

const mapStateToProps = (state) => {
  return {
    layers: state.layers
  };
};

export default connect(mapStateToProps)(MapComponent);