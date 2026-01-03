"use client";

import React from "react";

type BlogSectionProps = {
  title: string;
  children: React.ReactNode;
};

const BlogSection = ({ title, children }: BlogSectionProps) => {
  return (
    <div className="not-prose my-8 p-5 rounded-xl bg-surface border border-border transition-smooth hover:border-border-hover">
      <h3 className="text-heading font-semibold text-lg mb-3">{title}</h3>
      <div className="text-foreground text-[0.9375rem] leading-relaxed">{children}</div>
    </div>
  );
};

export default BlogSection;
