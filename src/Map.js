import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";
function ChangeMapView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
}

function Map({ countries, casesType, center, zoom }) {


    return (
        <div className="map">
            <MapContainer className="container" center={center} zoom={zoom} >
                <ChangeMapView coords={center} />

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {showDataOnMap(countries, casesType)}

            </MapContainer>
        </div>
    );
}

export default Map;