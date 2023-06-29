import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { HeaderTemplate } from "../../../templates/HeaderTemplate";

export function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAwOlQ6qDXwbz0b-ZIT74ETr9LB2hSIyIw",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <HeaderTemplate>
      <div className="font-bold text-4xl ml-4 mb-1">Find us!</div>
      <hr className="border-black mb-3" />
      <MapTeste />
    </HeaderTemplate>
  );
}

function MapTeste() {
  const center = useMemo(() => ({ lat: -29.463965, lng: -51.961151 }), []);

  return (
    <GoogleMap
      zoom={15}
      center={center}
      mapContainerStyle={{ height: "600px" }}
    >
      <MarkerF position={center} />
    </GoogleMap>
  );
}
