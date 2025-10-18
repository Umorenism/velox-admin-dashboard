
import { ThemeProvider } from "./context/ThemeContext";
import AppRouter from "./routes/AppRoutes";
import React from "react";

export default function App() {
  return (
    <ThemeProvider>
      <AppRouter/>
    </ThemeProvider>
  );
}
