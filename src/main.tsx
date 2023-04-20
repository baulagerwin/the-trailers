import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import Layout from "./components/layout/Layout";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./react-query/queryClient";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./main.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Layout>
          <App />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
