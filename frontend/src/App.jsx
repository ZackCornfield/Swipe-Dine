import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import MatchupPage from "./Pages/MatchupPage";
import ResultPage from "./Pages/ResultPage";

import "./App.css";
import Layout from "./Pages/Layout";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<SearchPage />}></Route>
                    <Route path="/matchup" element={<MatchupPage />}></Route>
                    <Route path="/result" element={<ResultPage />}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
