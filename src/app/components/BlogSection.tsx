"use client";

import React from "react";

type BlogSectionProps = {
  title: string;
  color?: "blue" | "green" | "purple" | "yellow" | "red";
  children: React.ReactNode;
};

const colorMap = {
  blue: {
    border: "border-blue-500",
    title: "text-blue-400",
  },
  green: {
    border: "border-green-500",
    title: "text-green-400",
  },
  purple: {
    border: "border-purple-500",
    title: "text-purple-400",
  },
  yellow: {
    border: "border-yellow-500",
    title: "text-yellow-400",
  },
  red: {
    border: "border-red-500",
    title: "text-red-400",
  },
};

const BlogSection = ({ title, color = "blue", children }: BlogSectionProps) => {
  const colors = colorMap[color];

  return (
    <div
      className={`not-prose bg-gray-800 border-l-4 ${colors.border} p-4 rounded my-6 w-full overflow-x-auto`}
    >
      <h3 className={`${colors.title} font-semibold text-lg mb-2`}>{title}</h3>
      {children}
    </div>
  );
};

export default BlogSection;
