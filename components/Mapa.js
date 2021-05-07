// import React, { Component, useState } from "react";
// import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
// import Link from "./Layout/ActiveLink";

// const mapStyles = {
//   // width: '100%',
//   //   height: '100%'
// };
// const containerStyle = {
//   // position: 'relative',
//   // width: '100%',
//   // height: '100%'
// };

// export class MapContainer extends Component {
//   state = {
//     showingInfoWindow: false,
//     activeMarker: {},
//     selectedPlace: {},
//   };

//   onMarkerClick = (props, marker, e) => {
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true,
//     });
//     console.log(marker);
//     console.log(props);
//   };
//   onMouseoverMarker(props, marker, e) {
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true,
//     });
//   }
//   onMapClicked = (props) => {
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null,
//       });
//     }
//   };
  
//   numberWithCommas = (x) => {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// }

//   render() {
//     return (
//       <Map
//         google={this.props.google}
//         zoom={13}
//         style={mapStyles}
//         containerStyle={containerStyle}
//         initialCenter={{
//           lat: -36.61511098551652,
//           lng: -64.28870477299115,
//         }}
//       >
//         {this.props.propiedadesFiltro.map((propiedad) => (
//           <Marker
//             className="marker"
//             onClick={this.onMarkerClick}
//             title={propiedad.ubicacion}
//             id={propiedad.id}
//             precio={this.numberWithCommas(propiedad.precio)}
//             position={propiedad.coordinates}
//             icon={{
//               // url: "https://maps.gstatic.com/mapfiles/transparent.png",
//               url:"/home_ping3.png"
//               // anchor: new google.maps.Point(32,32),
//               // scaledSize: new google.maps.Size(64,64)
//             }}
//             // label={{
//             //   text: `$${propiedad.precio}`,
//             //   fontFamily: "Segoe UI Historic",
//             //   fontWeight: "bold",
//             //   fontSize: "13px",
//             //   color: "black",
//             //   backgroundColor: "red",
//             //   padding:"5px"
//             // }}
//           ></Marker>
//         ))}
//         <InfoWindow
//           marker={this.state.activeMarker}
//           visible={this.state.showingInfoWindow}
//         >
//           <div>
//           <Link  href="/sucursales">
//             <h3>$ {this.state.selectedPlace.precio}</h3>
//           </Link>
            
//             {/* <div><Link  href="/propiedad/[id]" as={`/propiedad/${this.state.selectedPlace.id}`}            > */}
//                 {/* <p>Mas info</p> */}
//             {/* </Link></div> */}
            
//           </div>
//         </InfoWindow>
//         {/* <Marker
//           title={"The marker`s title will appear as a tooltip."}
//           name={"SOMA"}
//           position={{ lat: 37.778519, lng: -122.40564 }}
//           onClick={() => {}}
//         /> */}

//         {/* <Marker
//           name={"Dolores park"}
//           position={{ lat: 37.759703, lng: -122.428093 }}
//           draggable={true}
//           // onDragend={this.moveMarker.bind(this)}
//         >
//           <InfoWindow visible={true}>
//             <div >
//               <p>
//                 Click on the map or drag the marker to select location where the
//                 incident occurred
//               </p>
//             </div>
//           </InfoWindow>
//         </Marker> */}

//         {/* <InfoWindow
//           marker={this.state.activeMarker}
//           visible={this.state.showingInfoWindow}>
//             <div>
//               <h1>{this.state.selectedPlace.name}</h1>
//             </div>
//         </InfoWindow> */}
//         {/* <Marker
//           name={"Your position"}
//           position={{ lat: 37.762391, lng: -122.439192 }}
//           icon={{
//             url: "/add.png",
//             // anchor: new google.maps.Point(32, 32),
//             // scaledSize: new google.maps.Size(64, 64),
//           }}
//         /> */}
//       </Map>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyA0-rU3vYLOIiSgtfbfVC_m4SqRigS9vyk",
// })(MapContainer);
