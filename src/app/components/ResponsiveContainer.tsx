"use client";

import React from 'react';

type ResponsiveContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const ResponsiveContainer = ({ children, className = '' }: ResponsiveContainerProps) => {
  return (
    <div className={`overflow-x-auto w-full my-6 ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;