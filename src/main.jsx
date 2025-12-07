import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./component/NavBar.jsx";
import Pastes from "./component/Pastes.jsx";
import Error from "./component/Error.jsx";
import Home from "./component/Home.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <Home />
      </>
    ),
  },
  {
    path: "/?pasteID",
    element: (
      <>
        <NavBar />
        <Home />
      </>
    ),
  },
  {
    path: "/paste",
    element: (
      <>
        <NavBar />
        <Pastes />
      </>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <Error />
      </>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </Provider>,
);