import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import { CustomChartProps } from "./types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const CustomChart: React.FC<CustomChartProps> = ({ type, data, options }) => {
  const renderChart = () => {
    switch (type) {
      case "line":
        return <Line data={data} options={options} />;
      case "bar":
        return <Bar data={data} options={options} />;
      case "doughnut":
        return <Doughnut data={data} options={options} />;
      case "pie":
        return <Pie data={data} options={options} />;
      default:
        return null;
    }
  };

  return <div className="flex justify-center items-center w-full">{renderChart()}</div>;
};

export default CustomChart;
