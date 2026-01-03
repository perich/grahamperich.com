"use client";

import expenses from "./2024_expenses_percentage.json";

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

import { useState, useEffect } from "react";

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

const MOCK_NET_INCOME = 100; // Represents 100%

type ExpensesData = {
  [parentCategoryName: string]: {
    total: number;
    categories: {
      [categoryName: string]: number;
    };
  };
};

function formatExpensesData(expensesData: ExpensesData, netIncome: number) {
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
    { from: "Net Income", to: "Savings", flow: parseFloat(savings.toFixed(2)) },
    ...data,
  ];

  return {
    datasets: [
      {
        label: "2024 Finance Wrapped (% of Net Income)",
        data: finalData,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        colorFrom: (c: any) => nodeColors[c.dataset.data[c.dataIndex].from],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        colorTo: (c: any) => nodeColors[c.dataset.data[c.dataIndex].to],
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

const sankeyData = formatExpensesData(expenses, MOCK_NET_INCOME);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "2024 Finances Wrapped (Percentage Breakdown)",
      font: {
        size: 22,
        weight: "bold",
        family:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      },
      color: "#f0ede8", // warm white (heading)
      padding: {
        top: 20,
        bottom: 30,
      },
    },
    tooltip: {
      backgroundColor: "rgba(28, 27, 24, 0.95)", // surface with opacity
      titleFont: {
        weight: "bold",
        size: 14,
      },
      bodyFont: {
        size: 13,
      },
      borderColor: "rgba(201, 168, 124, 0.5)", // accent with opacity
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      boxPadding: 6,
      callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        label: function (context: any) {
          const flowValue = context.dataset.data[context.dataIndex].flow;
          return `${flowValue.toFixed(2)}% of Net Income`;
        },
      },
    },
    legend: {
      labels: {
        color: "#c9c4bb", // foreground
        font: {
          size: 13,
        },
      },
    },
  },
  layout: {
    padding: {
      top: 10,
      right: 20,
      bottom: 30,
      left: 20,
    },
  },
};

const SankeyDiagram = () => {
  const [height, setHeight] = useState(1000);
  const [width, setWidth] = useState(1000);
  const [maxWidth, setMaxWidth] = useState(3000);

  // Set the max width and initialize width based on window size after component mounts
  // This avoids the "window is not defined" error during SSR
  useEffect(() => {
    if (typeof window !== "undefined") {
      const viewportWidth = window.innerWidth;
      setMaxWidth(viewportWidth);

      // Set initial chart width based on viewport
      if (viewportWidth < 768) {
        // For mobile devices, start with a more appropriate width
        setWidth(Math.max(viewportWidth - 40, 300));
      }

      // Add resize event listener
      const handleResize = () => {
        setMaxWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="my-8">
      <div className="bg-surface p-5 sm:p-6 rounded-xl border border-border transition-smooth hover:border-border-hover mb-6 overflow-x-auto">
        <div className="font-semibold text-heading mb-5">Diagram Controls</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="height"
              className="text-foreground text-sm font-medium"
            >
              Chart Height: <span className="text-accent">{height}px</span>
            </label>
            <input
              type="range"
              id="height"
              min="400"
              max="3000"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-accent bg-border h-2 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="width"
              className="text-foreground text-sm font-medium"
            >
              Chart Width: <span className="text-accent">{width}px</span>
            </label>
            <input
              type="range"
              id="width"
              min="300"
              max={maxWidth}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full accent-accent bg-border h-2 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div
        className="overflow-x-auto bg-surface rounded-xl border border-border"
        style={{ width: "100%", maxWidth: "100vw" }}
      >
        <div
          className="chart-container p-2 sm:p-4"
          style={{
            position: "relative",
            height: `${height}px`,
            width: `${width}px`,
            minWidth: `${Math.min(300, width)}px`,
            margin: "0 auto",
          }}
        >
          {/* @ts-expect-error - ChartJS types are not updated for Sankey */}
          <Chart type="sankey" data={sankeyData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default SankeyDiagram;
