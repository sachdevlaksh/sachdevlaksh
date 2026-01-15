import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { useEffect, useState } from "react";

function AppRouter() {
  const baseUrl = import.meta.env.BASE_URL;
  const [location, setLocation] = useState(() => {
    const path = window.location.pathname;
    // Remove base URL from pathname
    if (path.startsWith(baseUrl.slice(0, -1))) {
      return path.slice(baseUrl.length - 1) || "/";
    }
    return path || "/";
  });

  useEffect(() => {
    const handlePopstate = () => {
      const path = window.location.pathname;
      if (path.startsWith(baseUrl.slice(0, -1))) {
        setLocation(path.slice(baseUrl.length - 1) || "/");
      } else {
        setLocation(path || "/");
      }
    };

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, [baseUrl]);

  // Simple routing logic
  if (location === "/") {
    return <Home />;
  }

  return <NotFound />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
