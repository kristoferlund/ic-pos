import Loading from "./components/Loading";
import React from "react";
import { RouterProvider } from "@tanstack/router";
import { Toaster } from "react-hot-toast";
import { router } from "./router";

// document.documentElement.classList.add("dark");

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-500 md:flex md:flex-col md:items-center md:justify-center">
      <div className="container flex flex-col max-w-lg min-h-screen p-0 m-0 mx-auto prose prose-xl text-black md:rounded-lg bg-slate-50 md:shadow-xl md:h-[750px] md:min-h-0">
        <React.Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
          <Toaster />
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
