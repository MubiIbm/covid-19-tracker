import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";
function ChangeMapView({ coords, zoom }) {
    const map = useMap();
    map.setView(coords, zoom);
    // console.log("Map => ",map.getZoom(4))
    return null;
}

function Map({ countries, casesType, center, zoom, country }) {


    return (
        <div className="map">
            {console.log(zoom)}
            <MapContainer className="container" center={center} zoom={(zoom)} >

                <ChangeMapView coords={center} zoom={(country === "Worldwide") ? 3 : 4} />

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