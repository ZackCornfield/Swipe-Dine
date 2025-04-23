import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import ResultPage from "./Pages/ResultPage";
import MatchUpPage from "./Pages/MatchUpPage";

import "./App.css";
import Layout from "./Pages/Layout";

import useGoogleMaps from "./hooks/useGoogleMaps";

function App() {
    useGoogleMaps();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<SearchPage />}></Route>
                    <Route
                        path="/matchup"
                        element={
                            <MatchUpPage
                                places={JSON.parse(
                                    sessionStorage.getItem("places")
                                )}
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
