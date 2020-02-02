import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

// Chart Component.
import PratBar from "./Components/BarChart/index.js";



function getLayout() {
  return [ { i: "0", x: 0, y: 0, w: 12, h: 12, minW: 6, minH: 12, maxW: 12 } ]
};


function returnData() {
  let max = 22;
  let min = 1;
  let m = 5000;
  let n = 4;  
  let outer_buffer = [];
  for(let i = 0;  i < n; i++) {
    let buffer = [];
    let packet = {};
    for(let j = 0; j < m; j++) {
      let data = {};
      data = {
        x  : j,
        y  : Math.floor(Math.random() * (max - min)) + min
      }
      buffer.push( data );
    };
    packet[ "data" ] = buffer;
    packet[ "id" ]   = "ID " + i;
    outer_buffer.push( packet );
  };
  return outer_buffer;
}


function App() {
  return (
    <div  style={{width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <div
          key={0}
          style={{width : "100%", height:"700px", border:"none", display:"flex", backgroundColor:"#0f1429"}}
        >
          {
            returnData() ? 
            <PratBar
              dataSet = {returnData()}
              header  = {"Random Data Plots"}
              >
            </PratBar>
            :
            <div>
              Loading...
            </div>
          }
        </div>
    </div>
  );
}

export default App;
