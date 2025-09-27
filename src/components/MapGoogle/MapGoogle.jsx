import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import React, { useRef } from "react";
import config from "../../config/config";
import styles from "./MapGoogle.module.scss";
import Marker from "./components/Marker";
import CustomMarker from "./components/CustomMarker";
import InfoWindowComponent from "./components/InfoWindowComponent";
import Container from "./components/Container";
// const {
//   GOOGLE_MAP: { PLACES, GOOGLE_API_KEY },
// } = config;

const MapGoogle = ({
  lat,
  long,
  zoom = 12,
  children,
  className = "",
  onClick,
}) => {
  const initialCenterRef = useRef({ lat: lat || 0, lng: long || 0 });

  return (
    <LoadScriptNext googleMapsApiKey={""} libraries={"places"}>
      <div className={"Map w-100 " + className}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={{ lat, lng: long }}
          zoom={zoom}
          mapContainerClassName={styles.map}
          onClick={onClick}
        >
          {children}
        </GoogleMap>
      </div>
    </LoadScriptNext>
  );
};

MapGoogle.Marker = Marker;
MapGoogle.InfoWindow = InfoWindowComponent;
MapGoogle.Container = Container;

export default MapGoogle;
