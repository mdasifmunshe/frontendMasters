import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { AdoptedPetContext } from "./AdoptedPetContext";
import { SearchParams } from "./Search/SearchParams";
import Details from "./Details/Details";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);

  return (
    <div
      className="m-0 p-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperC.jpg)",
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPet}>
            <header className="flex justify-center w-[1100px] mx-auto my-0">
              <Link to="/"
                className="text-[#333] text-[3px] no-underline font-bold block brightness-150 w-[279px] h-[76px] overflow-hidden indent-[-9999px] my-[20px] mx-0"
                style={{
                  background: "url(http://static.frontendmasters.com/resources/2019-05-02-complete-intro-react-v5/image-logo.png)",
                }}
              >
                Adopt Me!
              </Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />}></Route>
              <Route path="/" element={<SearchParams />}></Route>
            </Routes>
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
