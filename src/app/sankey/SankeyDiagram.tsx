"use client";

import expenses from "./2024_expenses.json";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { SankeyController, Flow } from "chartjs-chart-sankey";

import { Chart } from "react-chartjs-2";

import { useState } from "react";

// Usage example:
// const randomColor = generateBrightColor(); // Returns something like "#FF4E2A"

function generateBrightColor(): string {
  // Use HSL to ensure bright, saturated colors
  // Hue: random value between 0-360
  // Saturation: fixed at 70% for vibrancy
  // Lightness: fixed at 60% for brightness
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70;
  const lightness = 60;

  // Convert HSL to RGB
  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  // Convert RGB to Hex
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// const getHover = (key) => colors[key];
// const getColor = (key) => colors[key];
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
  SankeyController,
  Flow
);

const MOCK_NET_INCOME = 267_000;

type ExpensesData = {
  [parentCategoryName: string]: {
    total: number;
    categories: {
      [categoryName: string]: number;
    };
  };
};

type SankeyDataType = {
  datasets: {
    label: string;
    data: {
      from: string;
      to: string;
      flow: number;
    }[];
  }[];
};
function formatExpensesData(
  expensesData: ExpensesData,
  netIncome: number
): SankeyDataType {
  const data: Array<{ from: string; to: string; flow: number }> = [];
  let expenseTotal = 0;

  // Create a Set of all unique nodes
  const uniqueNodes = new Set<string>(["Net Income", "Savings"]);

  // First pass: collect all unique nodes
  Object.entries(expensesData).forEach(
    ([parentCategoryName, { categories }]) => {
      uniqueNodes.add(parentCategoryName);
      Object.keys(categories).forEach((categoryName) =>
        uniqueNodes.add(categoryName)
      );
    }
  );

  // Create a map of node names to colors
  const nodeColors = Array.from(uniqueNodes).reduce((acc, node) => {
    acc[node] = generateBrightColor();
    return acc;
  }, {} as Record<string, string>);

  // Second pass: create the flow data
  Object.entries(expensesData).forEach(([parentCategoryName, _]) => {
    const { total, categories } = _;
    expenseTotal += total;
    data.push({ from: "Net Income", to: parentCategoryName, flow: total });

    Object.entries(categories).forEach(([categoryName, categoryValue]) => {
      data.push({
        from: parentCategoryName,
        to: categoryName,
        flow: categoryValue,
      });
    });
  });

  const savings = netIncome - expenseTotal;
  const finalData = [
    { from: "Net Income", to: "Savings", flow: parseInt(savings.toFixed()) },
    ...data,
  ];

  return {
    datasets: [
      {
        label: "2024 Finance Wrapped",
        data: finalData,
        colorFrom: (c) => nodeColors[c.dataset.data[c.dataIndex].from],
        colorTo: (c) => nodeColors[c.dataset.data[c.dataIndex].to],
        color: "white",
        alpha: 0.75,
        size: "max",
        column: {
          ["Mortgage"]: 1,
          ["Savings"]: 1,
          ["Property Taxes"]: 1,
          ["Other"]: 1,
        },
      },
    ],
  };
}

const sankeyData: SankeyDataType = formatExpensesData(
  expenses,
  MOCK_NET_INCOME
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "2024 Finances Wrapped",
    },
  },
  layout: {
    padding: {
      top: 0,
      bottom: 20,
    },
  },
  // scales: {
  //   y: {
  //     beginAtZero: true,
  //     suggestedMin: 1800,
  //     suggestedMax: 2000,
  //   },
  //   x: {
  //     beginAtZero: true,
  //     suggestedMin: 1800,
  //     suggestedMax: 2000,
  //   },
  // },
};

const SankeyDiagram = () => {
  const [height, setHeight] = useState(1000);
  const [width, setWidth] = useState(1000);

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="height" className="text-sm">
          Chart Height: {height}px
        </label>
        <input
          type="range"
          id="height"
          min="800"
          max="4000"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-64"
        />

        <label htmlFor="width" className="text-sm">
          Chart Width: {width}px
        </label>
        <input
          type="range"
          id="width"
          min="800"
          max="4000"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-64"
        />
      </div>

      <div
        className="overflow-auto bg-slate-900 rounded-xl"
        style={{ width: "100%", maxHeight: "80vh" }}
      >
        <div
          className="chart-container"
          style={{
            position: "relative",
            height: `${height}px`,
            width: `${width}px`,
            minWidth: "800px",
            margin: "0 auto",
          }}
        >
          <Chart type="sankey" data={sankeyData} options={options} />
        </div>
      </div>
    </>
  );
};

export default SankeyDiagram;
