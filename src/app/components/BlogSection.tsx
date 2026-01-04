"use client";

import React from "react";

type BlogSectionProps = {
  title: string;
  children: React.ReactNode;
};

const BlogSection = ({ title, children }: BlogSectionProps) => {
  return (
    <div className="not-prose my-8 p-6 rounded-lg bg-surface border border-border">
      <h3 className="font-serif text-xl text-heading mb-4">{title}</h3>
      <div className="text-foreground text-[0.9375rem] leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default BlogSection;
