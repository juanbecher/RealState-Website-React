import React, { Component , useState} from 'react';
import GoogleMapReact from 'google-map-react';
import Link from "../Layout/ActiveLink";
import Marker from './Marker';

const Mapa2 = (props) => {
    const [center, setCenter] = useState({lat: -36.61511098551652, lng: -64.28870477299115 });
    const [zoom, setZoom] = useState(13);

    const propiedadesOrdenadas = props.currentPosts;
    const unaPropiedad= props.propiedad;
    const getMapOptions = (maps) => {
        return {
          disableDefaultUI: true,
          mapTypeControl: true,
          streetViewControl: true,
          styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
      };

    if (unaPropiedad) {
      // console.log(unaPropiedad)
      return (
        <div style={{ height: '100%', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyA0-rU3vYLOIiSgtfbfVC_m4SqRigS9vyk" }}
            defaultCenter={center}
            defaultZoom={zoom}
            options={getMapOptions}
          >
                                      <Marker
                                      lat={unaPropiedad.coordinates.lat}
                                      lng={unaPropiedad.coordinates.lng}
                                      // lat={-36.61511098551652} 
                                      // lng={ -64.28870477299115 }
                                      name={unaPropiedad.tipo}
                                      id={unaPropiedad.id}
                                      precio={unaPropiedad.precio}
                                      text={unaPropiedad.text}
                                    />
          </GoogleMapReact>
        </div>
      );
    }
    return (
      <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyA0-rU3vYLOIiSgtfbfVC_m4SqRigS9vyk" }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={getMapOptions}
      >
          {propiedadesOrdenadas.map((propiedad) => (
                                  <Marker
                                  key={propiedad.id}
                                  lat={propiedad.coordinates.lat}
                                  lng={propiedad.coordinates.lng}
                                  name={propiedad.tipo}
                                  id={propiedad.id}
                                  precio={propiedad.precio}
                                  // text="My Marker"
                                />
                               ))}
          
        
      </GoogleMapReact>
    </div>
  );
}
 
export default Mapa2;

