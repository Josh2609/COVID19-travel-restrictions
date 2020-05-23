// import React, { memo } from "react";
// import {
//   ZoomableGroup,
//   ComposableMap,
//   Geographies,
//   Geography
// } from "react-simple-maps";

// const geoUrl =
//   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


// const MapChart = ({ setTooltipContent }) => {
//   return (
//     <>
//       <ComposableMap data-tip="" width="1200" projectionConfig={{ scale: 200 }}>
//         <ZoomableGroup center={[20,0]}>
//           <Geographies geography={geoUrl}>
//             {({ geographies }) =>
//               geographies.map(geo => (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   onMouseEnter={() => {
//                     const { NAME } = geo.properties;
//                     setTooltipContent(`${NAME}`);
//                   }}
//                   onMouseLeave={() => {
//                     setTooltipContent("");
//                   }}
//                   style={{
//                     default: {
//                       fill: "#D6D6DA",
//                       outline: "none",
//                       stroke: "#000000"
//                     },
//                     hover: {
//                       fill: "#F53",
//                       outline: "none"
//                     },
//                     pressed: {
//                       fill: "#E42",
//                       outline: "none"
//                     }
//                   }}
//                 />
//               ))
//             }
//           </Geographies>
//         </ZoomableGroup>
//       </ComposableMap>
//     </>
//   );
// };

// export default memo(MapChart);


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


const MapChart = ({ setTooltipContent }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://192.168.1.225:5000/api/country`)
      .then(res => {
        setData(res.data.countries);
      })
      .catch((err) => console.log(err));
  }, []);

  // restriction level colours
  const colorArr = ["#7FFF00",
    "#ffa500",
    "#ffb2b2",
    "#ff7f7f",
    "#ff4c4c",
    "#ff0000"];


  return (
    <ComposableMap data-tip=""
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
                  onMouseEnter={() => {
                    const { NAME } = geo.properties;
                    setTooltipContent(
                      <div>
                        <h3>{NAME}</h3>
                        {d ? // if entryRestrictions true then entry not allowed
                          d.entryRestrictions ? 
                            <p style={{ color: "red" }}> Entry Allowed: No </p> 
                            : <p style={{ color: "green" }}>Entry Allowed: Yes</p> 
                          : ""}

                        {d ? // if transitRestrictions true then transit not allowed
                          d.transitRestrictions ? 
                            <p style={{ color: "red" }}> Transit Allowed: No </p> 
                            : <p style={{ color: "green" }}>Transit Allowed: Yes</p> 
                          : ""}

                        {d ? 
                          d.quarantineRequired ? 
                            <p style={{ color: "red" }}> Quarantine Required: Yes </p> 
                            : <p style={{ color: "green" }}>Quarantine Required: No</p> 
                          : ""}
                      </div>
                    );
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}

                  style={{
                    default: {
                      //fill: "#D6D6DA",
                      outline: "none",
                      stroke: "#000000"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                      stroke: "#000000"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                      stroke: "#000000"
                    }
                  }}
                  fill={d ? colorArr[d["restrictionLevel"]] : "#F5F4F6"}
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
