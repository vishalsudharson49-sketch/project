import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const StockChart = ({ symbol, price }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const prices = useRef([]);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: `${symbol} Live Price`,
            data: [],
            borderColor: "#007bff",
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: false },
        },
      },
    });

    return () => chartInstance.current.destroy();
  }, [symbol]);

  useEffect(() => {
    const chart = chartInstance.current;
    const now = new Date().toLocaleTimeString();
    prices.current.push(price);

    chart.data.labels.push(now);
    chart.data.datasets[0].data.push(price);

    if (chart.data.labels.length > 10) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
    }

    chart.update();
  }, [price]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef} />
    </div>
  );
};

export default StockChart;
