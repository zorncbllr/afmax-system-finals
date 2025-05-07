import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 10,
    },
  },
});

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container element not found");
}

const root = createRoot(container);

function renderApp() {
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
}

renderApp();

if (import.meta.hot) {
  import.meta.hot.accept(renderApp);
}
