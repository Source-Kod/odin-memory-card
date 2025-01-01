import { useState } from "react";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <>
      <div className="header">
        <h1>Memory Game</h1>
        <h3>Click each card, but only once.</h3>
        <div className="scoreboard flex justify-center gap-4">
          <p>Current Score: {score} </p>
          <p>Best Score: {bestScore} </p>
        </div>
      </div>
      <div className="gameboard"></div>
    </>
  );
}

export default App;
