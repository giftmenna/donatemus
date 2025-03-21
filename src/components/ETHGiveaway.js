import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

// Reusable Ethereum Icon Component
const EthereumIcon = ({ size = "16px", style = {} }) => {
  return (
    <FontAwesomeIcon 
      icon={faEthereum} 
      style={{ 
        width: size, 
        height: size, 
        ...style 
      }} 
    />
  );
};

const ETHGiveaway = () => {
  const [cryptoData, setCryptoData] = useState({
    ethereum: { usd: 0, usd_24h_change: 0 },
  });

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@ticker");

    ws.onopen = () => {
      console.log("WebSocket connected for ETH");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCryptoData({
        ethereum: {
          usd: parseFloat(data.c),
          usd_24h_change: parseFloat(data.P),
        },
      });
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected for ETH");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fff",
        padding: "20px",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "600px",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "18px",
            color: "#000",
            margin: 0,
            fontWeight: "bold",
          }}
        >
          ELON MUSK
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              marginRight: "8px",
              color: "#f5a623",
            }}
          >
            <EthereumIcon size="24px" />
          </span>
          <span
            style={{
              fontSize: "18px",
              marginRight: "8px",
              fontWeight: "bold",
            }}
          >
            ${cryptoData.ethereum.usd.toLocaleString()}
          </span>
          <span
            style={{
              fontSize: "16px",
              color: cryptoData.ethereum.usd_24h_change >= 0 ? "#34a853" : "#ea4335",
              fontWeight: "bold",
            }}
          >
            {cryptoData.ethereum.usd_24h_change.toFixed(2)}%
          </span>
        </div>
      </header>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "500px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              color: "#1a73e8",
              fontSize: "18px",
              margin: "0 0 15px 0",
              fontWeight: "bold",
            }}
          >
            Rules
          </h2>
          <p
            style={{
              color: "#202124",
              fontSize: "14px",
              lineHeight: "1.5",
              margin: "0 0 15px 0",
            }}
          >
            In order to receive ETH from our giveaway - you have to send ETH & we
            will send back to you double the amount, instantly! This is to avoid
            bad actors exploiting our giveaway.
          </p>
          <p
            style={{
              backgroundColor: "#ffebee",
              padding: "10px",
              borderRadius: "5px",
              color: "#d32f2f",
              fontSize: "14px",
              margin: "0 0 10px 0",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            IMPORTANT
          </p>
          <p
            style={{
              color: "#202124",
              fontSize: "14px",
              textAlign: "center",
              margin: "0 0 20px 0",
              fontWeight: "bold",
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            You can only participate ONCE!
          </p>
          <Link to="/ethparticipate">
            <button
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "12px",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              To participate
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ETHGiveaway;