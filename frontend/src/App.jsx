import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import ResultPage from "./Pages/ResultPage";
import MatchUpPage from "./pages/MatchUpPage";
import "./App.css";
import Layout from "./Pages/Layout";
import useGoogleMaps from "./hooks/useGoogleMaps";
import { useState, useEffect } from "react";

function App() {
  useGoogleMaps();
  const [placesKey, setPlacesKey] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => {
      setPlacesKey((prevKey) => prevKey + 1);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SearchPage />}></Route>
          <Route
            path="/matchup"
            element={
              <MatchUpPage
                key={placesKey}
                places={JSON.parse(sessionStorage.getItem("places"))}
              />
            }
          ></Route>
          <Route path="/result" element={<ResultPage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
