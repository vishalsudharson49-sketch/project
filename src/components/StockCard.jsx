import React from "react";

const StockCard = ({ symbol, data }) => {
  return (
    <div className="card">
      <h2>{symbol}</h2>
      <p><b>Current Price:</b> ${data.c}</p>
      <p>High: ${data.h}</p>
      <p>Low: ${data.l}</p>
      <p>Open: ${data.o}</p>
      <p>Prev Close: ${data.pc}</p>
    </div>
  );
};

export default StockCard;
