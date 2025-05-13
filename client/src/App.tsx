import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { routes } from "./routes/routes";
import ProtectedRoute from "./components/protected-route";

function App() {
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
