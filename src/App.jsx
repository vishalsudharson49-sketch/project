import React, { useState, useEffect } from "react";
import StockCard from "./components/StockCard";
import StockChart from "./components/StockChart";
import "./styles.css";

const App = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Finnhub public demo API — no key required
  const fetchStock = async () => {
    try {
      const res = await fetch(
  `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=d3ho061r01qi2vu1q1k0d3ho061r01qi2vu1q1kg`
);

      const result = await res.json();
      if (!result.c) throw new Error("Invalid symbol");
      setData(result);
      setError(null);
    } catch (err) {
      setError("Error fetching data. Try again!");
      setData(null);
    }
  };

  useEffect(() => {
    fetchStock();
    const interval = setInterval(fetchStock, 5000); // auto refresh
    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div className="app-container">
      <h1>📈 Real-Time Stock Ticker</h1>

      <div className="search-bar">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g., AAPL)"
        />
        <button onClick={fetchStock}>Get Data</button>
      </div>

      {error && <p className="error">{error}</p>}
      {data && <StockCard symbol={symbol} data={data} />}
      {data && <StockChart symbol={symbol} price={data.c} />}
    </div>
  );
};

export default App;
