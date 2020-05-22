import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import axios from 'axios';


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const MapChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://192.168.1.225:5000/api/country`)
      .then(res => {
        setData(res.data.countries);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(data)

  // restriction level colours
  const colorArr = ["#7FFF00",
    "#ffa500",
    "#ffb2b2",
    "#ff7f7f",
    "#ff4c4c",
    "#ff0000"]; 

  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const d = data.find(s => s.iso3 === geo.properties.ISO_A3);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d? colorArr[d["restrictionLevel"]] : "#F5F4F6"}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default MapChart;
