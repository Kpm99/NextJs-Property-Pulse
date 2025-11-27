"use client";
import { useEffect, useState } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FiMapPin } from "react-icons/fi";
import { renderToString } from "react-dom/server"; 
const PropertyMap = ({ properties }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  // ✅ Configure geocode
  setDefaults({
    key: process.env.NEXT_PUBLIC_GEOCODE_API_KEY,
    language: "en",
    region: "in",
  });


    const reactIconHtml = `<div style="color: #e63946; font-size: 32px; transform: translate(-50%, -100%);">
    ${renderToString(<FiMapPin />)}
  </div>`;

  

  const customDivIcon = new L.DivIcon({
    html: reactIconHtml,
    iconSize: [15, 30],
    className: "", // disable default Leaflet styles
  });
  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${properties.location.street}, ${properties.location.city}, ${properties.location.state}`
        );
        console.log("Geocode result:", res);

        if (!res.results || res.results.length === 0) {
          setGeocodeError(true);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
      } catch (error) {
        console.error("Error in geocode:", error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [properties]);

  // 🌀 Handle loading and errors
  if (loading) return <h3>Loading map...</h3>;
  if (geocodeError) return <div className="text-xl">No location found!</div>;

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        // OpenStreetMap tiles (open & free)
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]} icon={customDivIcon}>
        <Popup>
          {properties.name || "Property Location"}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default PropertyMap;
