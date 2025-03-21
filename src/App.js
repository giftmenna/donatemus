import React from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Giveaway from "./components/Giveaway";
import BTCGiveaway from "./components/BTCGiveaway";
import ETHGiveaway from "./components/ETHGiveaway";
import DOGEGiveaway from "./components/DOGEGiveaway";
import DOGEParticipate from "./components/DOGEParticipate";
import BTCParticipate from "./components/BTCParticipate";
import ETHParticipate from "./components/ETHParticipate";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/giveaway" element={<Giveaway />} />
          <Route path="/btcgiveaway" element={<BTCGiveaway />} />
          <Route path="/ethgiveaway" element={<ETHGiveaway />} />
          <Route path="/dogegiveaway" element={<DOGEGiveaway />} />
          <Route path="/dogeparticipate" element={<DOGEParticipate />} />
          <Route path="/btcparticipate" element={<BTCParticipate />} />
          <Route path="/ethparticipate" element={<ETHParticipate />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;