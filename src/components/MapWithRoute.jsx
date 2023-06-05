import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-arrowheads";
import "leaflet/dist/leaflet.css";
import markerIcon from "../images/marker-icon.png";
import { getDistance, getZoom, getcentrMap } from "../fakeApi";

var iconStyle = L.icon({
  iconUrl: markerIcon,
  iconSize: [30, 31],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  title: "Початковий пункт",
  alt: "Початковий пункт",
});

const MapWithRoute = ({ shipment }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const centrMap = getcentrMap(shipment);
    const distance = getDistance(
      shipment.originRoute,
      shipment.destinationRoute
    );
    const zoom = getZoom(distance);
    const coordinates = [
      [shipment.originRoute.lat, shipment.originRoute.lng],
      [shipment.destinationRoute.lat, shipment.destinationRoute.lng],
    ];

    mapRef.current = L.map(mapContainerRef.current).setView(centrMap, zoom);

    L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      attribution:
        'Map data &copy; <a href="https://www.google.com/">Google</a>',
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      maxZoom: 20,
    }).addTo(mapRef.current);

    // Додавання маркерів

    iconStyle = L.icon({
      iconUrl: markerIcon,
      iconSize: [30, 31],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      title: "Початковий пункт",
      alt: "Початковий пункт",
    });
    L.marker(shipment.originRoute, { icon: iconStyle }).addTo(mapRef.current);

    iconStyle = L.icon({
      iconUrl: markerIcon,
      iconSize: [30, 31],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      title: "Кінцевийвий пункт",
      alt: "Кінцевийвий пункт",
    });

    L.marker(shipment.destinationRoute, { icon: iconStyle }).addTo(
      mapRef.current
    );
    // Додавання лінії маршруту
    const routeLine = L.polyline(coordinates).addTo(mapRef.current);
    routeLine.arrowheads({
      size: "15px",
      frequency: "endonly",
    });

    // Збільшення масштабу, щоб лінія маршруту була видимою
    mapRef.current.fitBounds(routeLine.getBounds());
    // Очищення мапи під час розмонтування компонента
    return () => {
      mapRef.current.remove();
    };
  }, [shipment]);

  return <div ref={mapContainerRef} style={{ height: "400px" }} />;
};

export default MapWithRoute;
