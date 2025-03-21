import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Giveaway = () => {
  return (
    <div className="App">
      <header className="video-header">
        <div className="video-container">
          <video
            src={`${process.env.PUBLIC_URL}/eland.mp4`}
            controls
            autoPlay
            muted
            loop
            className="video-player"
            poster="https://via.placeholder.com/600x300"
            width="300"
            height="300"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </header>
      <main className="giveaway-main">
        <p className="tagline">Let's bring crypto to every home in America!</p>
        <div className="giveaway-buttons">
          <Link to="/btcgiveaway">
            <button className="button btc-button">BTC Giveaway</button>
          </Link>
          <Link to="/ethgiveaway">
            <button className="button eth-button">ETH Giveaway</button>
          </Link>
          <Link to="/dogegiveaway">
            <button className="button doge-button">DOGE Giveaway</button>
          </Link>
        </div>
        <div className="info-cards">
          <div className="info-card">
            <h2>Elon Musk</h2>
            <p>The founder of this event <br /> and one of the main <br /> sponsors of the event</p>
          </div>
          <div className="info-card">
            <h2>$100,000,000</h2>
            <p>Raised to host this huge <br /> giveaway with the support <br /> of the Tesla</p>
          </div>
          <div className="info-card">
            <h2>60 BTC / 300 ETH / 50,000 DOGE</h2>
            <p>Max amount that we can <br /> get on your crypto wallet <br /> after participating in this <br /> event</p>
          </div>
          <div className="info-card">
            <h2>Terms of participation</h2>
            <p>Important: you can only <br /> participate in this Giveaway <br /> 1 time!</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Giveaway;