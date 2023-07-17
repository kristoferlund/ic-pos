import { Github, GithubIcon } from "lucide-react";
import { Link, RouterProvider } from "@tanstack/router";

import FullpageLoading from "./components/FullpageLoading";
import React from "react";
import { Toaster } from "react-hot-toast";
import { router } from "./router";

// document.documentElement.classList.add("dark");

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-500 md:flex md:flex-col md:items-center md:justify-center">
        <div className="container flex flex-col max-w-lg min-h-screen p-0 m-0 mx-auto prose prose-xl text-black md:rounded-lg bg-slate-50 md:shadow-xl md:h-[750px] md:min-h-0">
          <React.Suspense fallback={<FullpageLoading />}>
            <RouterProvider router={router} />
            <Toaster />
          </React.Suspense>
        </div>
        <div className="invisible w-full mt-5 text-center text-gray-600 md:visible">
          Developed by:{" "}
          <a
            href="https://github.com/kristoferlund"
            target="_blank"
            className="underline"
          >
            Kristofer Lund
          </a>
        </div>
        <div className="invisible w-full mt-3 text-center text-gray-600 md:visible">
          <a
            href="https://github.com/kristoferlund/ic-pos"
            target="_blank"
            className="underline"
          >
            <GithubIcon className="inline-block w-4 h-4" />{" "}
            https://github.com/kristoferlund/ic-pos
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
