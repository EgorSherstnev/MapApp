import React from "react";
import { GeoJSON, FeatureGroup, Popup } from "react-leaflet";

export default class GeojsonLayer extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         data: []
      }

      console.log('constructor')
   }

   render() {
      console.log('render')

      console.info(this.state.data)
      return (
         <FeatureGroup>
            {
               this.state.data.map(f => {
                  return <GeoJSON key={f.properties.id} data={f}>
                     <Popup>{f.properties.id}</Popup>
                  </GeoJSON>
               })
            }
         </FeatureGroup>
      )
   }

   componentDidMount() {
      if (this.props.url) {
         this.fetchData(this.props.url)
      }

      console.log('did mount')
   }

   componentWillUnmount() {
      console.log('will unmount')
   }

   fetchData(url) {
      let request = fetch(url);

      request
         .then(r => r.json())
         .then(data => {
            this.setState({
               data: data.features
            })
         }, (error) => {
            console.error(error)
         })
   }
}