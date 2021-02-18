import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import IPData from "ipdata";
import ErrorPage from "./ErrorPage";
import PageLoader from "./PageLoader";

const ipdata = new IPData(process.env.REACT_APP_IPDATA_KEY);

export default function MapContainer() {
  const [userData, setUserData] = useState();
  const [showError, setShowError] = useState(false);

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const getIp = useCallback(async () => {
    try {
      const data = await ipdata.lookup();
      setUserData(data);
    } catch (e) {
      setShowError(true);
    }
  }, []);

  useEffect(() => {
    getIp();
  }, []);

  const mapStyles = {
    height: "70vh",
    width: "70vw",
  };

  /* Just about the center of Israel */
  const defaultCenter = {
    lat: 31.58503,
    lng: 35,
  };

  const options = {
    disableDefaultUI: true,
  };

  if (!userData) {
    return <PageLoader isVisible={!showError} />;
  }

  if (showError) {
    return <ErrorPage />;
  }

  const coffeeImage = (
    <img
      alt="TubbyNuggetGIF"
      src="https://media0.giphy.com/media/H5vrCaAXnBEslTZwMM/giphy.gif"
      width="50"
      height="50"
      className="tubbyNugget"
    />
  );

  return (
    <>
      <h1 id="welcome">{coffeeImage} Welcome! {coffeeImage}</h1>
      <div id="map-container">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={7}
            center={defaultCenter}
            options={options}
            onLoad={onMapLoad}
          >
            <Marker
              position={{
                lat: userData.latitude,
                lng: userData.longitude,
              }}
            />
          </GoogleMap>
        </LoadScript>
        <table className="geo-info">
          <tr className="geo-headers">
            <th>Country</th>
            <th>City</th>
          </tr>
          <tr>
            <td>{userData.country_name}</td>
            <td>{userData.city}</td>
          </tr>
        </table>
      </div>
    </>
  );
}
