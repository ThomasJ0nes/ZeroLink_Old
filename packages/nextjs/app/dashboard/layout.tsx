// components/layout.tsx
import React, { ReactNode } from "react";
import { ThemeProvider } from "~~/components/ThemeProvider";

// Define a type for the props
interface LayoutProps {
  children: ReactNode; // Children prop to be of type ReactNode
}

// Define a layout component that wraps around the page content
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* The layout content */}

      <div>{children}</div>
    </div>
  );
};

export default Layout;
