import React from "react";
import ReactCardFlip from "react-card-flip";
import Data from "./data.json";
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';



const Card = ({ dev }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  let history = useHistory();

  const redirect = (url) => {
    history.push(url);
  };
  return (
    <>
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div
        onClick={() => setIsFlipped((prev) => !prev)}
        className="aboutCards"
      >
        <div className="cardDevs">
          <h5><strong>{dev.title}</strong></h5>
          <img className="devImg"src={dev.pic} />
          <div className="frontInfo">
            <div><strong>{dev.position}</strong></div>
            <div className="aboutFront">{dev.aboutMe}</div>
          </div>
        </div>
      </div>
      <div
        onClick={() => setIsFlipped((prev) => !prev)}
        className="aboutCards"
      >
      <div className="cardDevs">
        <h5><strong>{dev.title}</strong></h5>
        <div className="aboutCards">
          <div><strong>Technical Skills:</strong> <br /> {dev.languages}</div>
          <div><strong>Favorite Quote:</strong> <br />{dev.favoriteQuote}</div>
          <div>
          <br />
          <button onClick={()=> redirect(dev.linkedIn) } className="btn btn-light"><a href={dev.linkedIn}>LinkedIn</a></button>
          </div>
        </div>
      </div>
      </div>
    </ReactCardFlip>
    </>
  );
};

const AboutUs = () => {
  return (
    <div className="devs">
      {Data.map((item, index) => (
        <Card dev={item} key={`card-${index}`} />
      ))}
    </div>
  );
};


export default AboutUs;
