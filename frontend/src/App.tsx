import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PropertyDetails from "./pages/PropertyDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
