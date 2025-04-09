import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

function GoogleMaps() {

    const mapRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.PUBLIC_GOOGLE_API_KEY || "",
        version: "weekly",
        libraries: ["places"],
      });

      const { Map } = await loader.importLibrary("maps");

      const location = { lat: 40.73061, lng: -73.935242 };

      const options = {
        center: location,
        zoom: 15,
        mapId: "map"
      }

      new Map(mapRef.current as HTMLElement, options);

    };
    initMap();
  }, []);

  return <div ref={mapRef} className='w-full h-screen'/>;
}

export default GoogleMaps;
