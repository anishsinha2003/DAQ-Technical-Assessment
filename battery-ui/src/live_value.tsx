import React from 'react';
import './App.css';
import fire from './images/fire.png';
import cube from './images/cube.png';

interface TemperatureProps {
  temp: number;
}

function LiveValue({ temp } : TemperatureProps) {

  let valueColour = 'white';

  if (temp < 20) {
    valueColour = 'blue';
  }
  if (temp > 80) {
    valueColour = 'red';
  }

  return (
      <div style={{ width: "100%", height: "1200px", position: "relative", top: "-480px"  }}>
        <div className="sky">
          <div className="tree"></div>
          <div style={{ position: "relative", "top": "-890px", fontSize: 50, fontFamily: "monospace", fontWeight: "bold", color: "#333333" }}>
            Temperature of Battery
          </div>
          <header className="live-value" style={{ color : valueColour, zIndex: "10", textAlign: "center", position: "relative", "top": "-800px", right: "-850px", fontSize: 50, width: "10px", height: "10px", backgroundColor: "black", borderRadius: "40px", boxShadow:"1px 0px 10px 10px black" }}>
            {valueColour === 'blue' ?
              <div>
                <img src={cube} alt="cube" style={{ height: "150px", width: "190px", position: "relative", top: "-70px", left: "-90px" }}/>
                <span style={{ position: "relative", top: "-190px", left: "-70px", fontWeight: "bold" }}>
                  {`${temp.toString()}°C`}
                </span>
              </div>
              : valueColour === 'red' ?
              <div>
                <img src={fire} alt="cube" style={{ height: "150px", width: "190px", position: "relative", top: "-70px", left: "-90px" }}/>
                <span style={{ position: "relative", top: "-180px", left: "-70px", fontWeight: "bold" }}>
                    {`${temp.toString()}°C`}
                </span>
              </div>
              : 
              <div>
                <span style={{ position: "relative", top: "-20px", left: "-70px", fontWeight: "bold", color: "green" }}>
                  {`${temp.toString()}°C`}
                </span>
              </div>
            }
  
          </header>
          <div className="track"></div>
          <div className="car"></div>
          <div className=" wheel wheel1"></div>
          <div className="wheel wheel2"></div>
        </div>
      </div>
  );
}

export default LiveValue;