import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Define props to accept children
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false); // State to check client-side rendering
  const router = useRouter();

  useEffect(() => {
    // Ensure the code runs only on the client side
    setIsClient(true);
  }, []);

  // Don't use `router` until we're on the client side
  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Current Route in Layout: {router.pathname}</h1>
      {/* Render the children passed into this component */}
      <div>{children}</div>
    </div>
  );
};

export default Layout;
