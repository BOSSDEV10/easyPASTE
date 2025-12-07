import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import toast, { ToastBar, Toaster } from "react-hot-toast";
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
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          custom: {
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              fontSize: '14px',
            },
          },
          success: {
            duration: 3000,
            style: {
              background: '#10b981',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10b981',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#ef4444',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#ef4444',
            },
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {icon}
                <span style={{ flex: 1 }}>{message}</span>
                {t.type !== 'loading' && (
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'inherit',
                      cursor: 'pointer',
                      fontSize: '18px',
                      padding: '0 4px',
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </ToastBar>
        )}
      </Toaster>
    </Provider>
  </StrictMode>,
);