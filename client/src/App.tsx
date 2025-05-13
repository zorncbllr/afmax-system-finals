import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { routes } from "./routes/routes";
import ProtectedRoute from "./components/protected-route";
import { useLayoutEffect } from "react";
import { useAuthStore } from "./features/auth/store";

function App() {
  const { initAuth } = useAuthStore();

  useLayoutEffect(() => {
    initAuth();
  }, []);

  return (
    <>
      <Toaster />

      <Routes>
        {routes.map((route) => (
          <Route
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoute>
                  <route.element />
                </ProtectedRoute>
              ) : (
                <route.element />
              )
            }
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
