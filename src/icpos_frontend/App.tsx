import React from "react";
import { RouterProvider } from "@tanstack/router";
import { Toaster } from "react-hot-toast";
import { router } from "./router";

function App() {
  return (
    <div className="container max-w-lg p-0 m-0 mx-auto prose prose-xl">
      <React.Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
        <Toaster />
      </React.Suspense>
    </div>
  );
}

export default App;
