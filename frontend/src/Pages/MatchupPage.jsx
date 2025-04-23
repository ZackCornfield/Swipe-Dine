import { useState, useEffect } from "react";
import PlaceCard from "../Components/PlaceCard";
import styles from "./MatchUpPage.module.css";

const MatchUpPage = ({ places }) => {
    const [currentRound, setCurrentRound] = useState([...places]);
    const [winner, setWinner] = useState(null);
    const [currentMatchup, setCurrentMatchup] = useState([]);
    const [matchupHistory, setMatchupHistory] = useState([]);

    // Initialize the first matchup
    useEffect(() => {
        if (places.length > 0) {
            setCurrentMatchup([currentRound[0], currentRound[1]]);
        }
    }, [places]);

    const handleSelection = (selectedPlace) => {
        // Add the current matchup to history
        setMatchupHistory([...matchupHistory, currentMatchup]);

        // Get the index of the selected place
        const selectedIndex = currentMatchup.findIndex(
            (p) => p === selectedPlace
        );
        const winner = currentMatchup[selectedIndex];
        const loser = currentMatchup[1 - selectedIndex]; // The other one

        // Create next round
        const nextRound = [...currentRound];
        nextRound.splice(nextRound.indexOf(loser), 1);

        setCurrentRound(nextRound);

        // Check if we have a winner
        if (nextRound.length === 1) {
            setWinner(nextRound[0]);
            return;
        }

        // Set up next matchup
        const nextMatchupIndex = nextRound.length > 1 ? 0 : -1;
        if (nextMatchupIndex >= 0) {
            setCurrentMatchup([
                nextRound[nextMatchupIndex],
                nextRound[nextMatchupIndex + 1],
            ]);
        }
    };

    if (winner) {
        return (
            <div className={styles.winnerContainer}>
                <h2>Your chosen place is:</h2>
                <PlaceDetails place={winner} />
                <button
                    onClick={() => {
                        setCurrentRound([...places]);
                        setWinner(null);
                        setCurrentMatchup([places[0], places[1]]);
                        setMatchupHistory([]);
                    }}
                    className={styles.resetButton}
                >
                    Start Over
                </button>
            </div>
        );
    }

    if (currentMatchup.length < 2) {
        return <div>Loading matchups...</div>;
    }

    return (
        <div className={styles.matchupContainer}>
            <h2>Which place do you prefer?</h2>
            <div className={styles.matchupGrid}>
                <div className={styles.placeOption}>
                    <PlaceCard place={currentMatchup[0]} />
                    <button
                        onClick={() => handleSelection(currentMatchup[0])}
                        className={styles.selectButton}
                    >
                        Choose This One
                    </button>
                </div>
                <div className={styles.divider}>VS</div>
                <div className={styles.placeOption}>
                    <PlaceCard place={currentMatchup[1]} />
                    <button
                        onClick={() => handleSelection(currentMatchup[1])}
                        className={styles.selectButton}
                    >
                        Choose This One
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatchUpPage;
