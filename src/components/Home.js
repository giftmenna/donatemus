import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import "../App.css";

// Reusable Ethereum Icon Component (matching ETHGiveaway.js)
const EthereumIcon = ({ size = "16px", style = {} }) => {
  return (
    <FontAwesomeIcon
      icon={faEthereum}
      style={{
        width: size,
        height: size,
        ...style,
      }}
    />
  );
};

const Home = () => {
  const [cryptoData, setCryptoData] = useState({
    bitcoin: { usd: 0, usd_24h_change: 0 },
    ethereum: { usd: 0, usd_24h_change: 0 },
    dogecoin: { usd: 0, usd_24h_change: 0 },
  });

  useEffect(() => {
    // WebSocket connections for BTC, ETH, and DOGE
    const wsBTC = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");
    const wsETH = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@ticker");
    const wsDOGE = new WebSocket("wss://stream.binance.com:9443/ws/dogeusdt@ticker");

    // Handle BTC updates
    wsBTC.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCryptoData((prev) => ({
        ...prev,
        bitcoin: {
          usd: parseFloat(data.c),
          usd_24h_change: parseFloat(data.P),
        },
      }));
    };

    // Handle ETH updates
    wsETH.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCryptoData((prev) => ({
        ...prev,
        ethereum: {
          usd: parseFloat(data.c),
          usd_24h_change: parseFloat(data.P),
        },
      }));
    };

    // Handle DOGE updates
    wsDOGE.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCryptoData((prev) => ({
        ...prev,
        dogecoin: {
          usd: parseFloat(data.c),
          usd_24h_change: parseFloat(data.P),
        },
      }));
    };

    // Error handling for all WebSockets
    [wsBTC, wsETH, wsDOGE].forEach((ws) => {
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      ws.onopen = () => {
        console.log("WebSocket connected:", ws.url);
      };
      ws.onclose = () => {
        console.log("WebSocket disconnected:", ws.url);
      };
    });

    // Cleanup WebSockets on unmount
    return () => {
      wsBTC.close();
      wsETH.close();
      wsDOGE.close();
    };
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>ELON MUSK</h1>
        <div className="crypto-prices">
          <div className="crypto">
            <span className="icon btc">₿</span>
            <span className="price">
              ${cryptoData.bitcoin.usd.toLocaleString()}
            </span>
            <span
              className={`change ${
                cryptoData.bitcoin.usd_24h_change >= 0 ? "positive" : "negative"
              }`}
            >
              {cryptoData.bitcoin.usd_24h_change.toFixed(2)}%
            </span>
          </div>
          <div className="crypto">
            <span className="icon eth">
              <EthereumIcon size="24px" style={{ color: "#f5a623" }} />
            </span>
            <span className="price">
              ${cryptoData.ethereum.usd.toLocaleString()}
            </span>
            <span
              className={`change ${
                cryptoData.ethereum.usd_24h_change >= 0 ? "positive" : "negative"
              }`}
            >
              {cryptoData.ethereum.usd_24h_change.toFixed(2)}%
            </span>
          </div>
          <div className="crypto">
            <span className="icon doge">Ð</span>
            <span className="price">${cryptoData.dogecoin.usd.toFixed(2)}</span>
            <span
              className={`change ${
                cryptoData.dogecoin.usd_24h_change >= 0 ? "positive" : "negative"
              }`}
            >
              {cryptoData.dogecoin.usd_24h_change.toFixed(2)}%
            </span>
          </div>
        </div>
      </header>
      <main>
        <div className="profile-section">
          <img
            src="/elon.PNG"
            alt="Elon Musk"
            className="profile-image"
          />
          <h2>
            Elon Musk{" "}
            <span className="verified-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2 L14.5 8.5 L21 9 L16 14 L17.5 20.5 L12 17 L6.5 20.5 L8 14 L3 9 L9.5 8.5 L12 2 Z"
                  fill="#f7931a"
                />
                <path
                  d="M9 12 L11 14 L15 10"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h2>
          <p className="giveaway-text">
            1,000 BTC / 5,000 ETH / 500,000 DOGE <br /> Giveaway
          </p>
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
        </div>
        <div className="video-section">
          <div className="video-container">
            <video
              src="/eland.MP4" // Replaced placeholder with actual video
              controls // Native controls for playback
              autoPlay // Auto-plays (requires muted)
              muted // Required for autoPlay
              loop // Loops the video
              className="video-player"
              poster="https://via.placeholder.com/600x300" // Fallback image
              width="600"
              height="300"
            >
              Your browser does not support the video tag. Please ensure the video file exists at /eland.MP4 and is in a supported format (e.g., MP4 with H.264).
            </video>
          </div>
        </div>
        <div className="info-cards">
          <div className="info-card">
            <h2>Elon Musk</h2>
            <p>
              The founder of this event <br />
              and one of the main <br />
              sponsors of the event
            </p>
          </div>
          <div className="info-card">
            <h2>$100,000,000</h2>
            <p>
              Raised to host this huge <br />
              giveaway with the support <br />
              of the Tesla
            </p>
          </div>
          <div className="info-card">
            <h2>60 BTC / 300 ETH / 50,000 DOGE</h2>
            <p>
              Max amount that we can <br />
              get on your crypto wallet <br />
              after participating in this <br />
              event
            </p>
          </div>
          <div className="info-card">
            <h2>Terms of participation</h2>
            <p>
              Important: you can only <br />
              participate in this Giveaway <br />
              1 time!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;