import React,{useEffect, useState} from "react";
// import Layout from "./Layout/Layout";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

const Opciones = styled.div`
    /* position: absolute; */
    /* top:300px; */
`

const InputAdress = (props) => {
    // console.log(props.setUbicacion);
    // console.log(typeof(props));
    const {setCoordinates,setUbicacion} = props
//   const {setCoordinates, setubicacion} = props;
  const [address, setAddress] = useState("");

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    console.log(value);
    setCoordinates(latLng);
    setUbicacion(value);
  };


  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {/* <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p> */}

            <input {...getInputProps({ placeholder: "Ubicación" })} css={css`width:100%;`}/>

            <Opciones>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })} >
                    {suggestion.description}
                  </div>
                );
              })}
            </Opciones>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
  
  }

export default InputAdress;