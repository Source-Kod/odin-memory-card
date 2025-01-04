import { useState, useEffect } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [chosenCards, setChosenCards] = useState([]);
  const [cards, setCards] = useState([
    { id: "ditto", cardImg: null },
    { id: "pikachu", cardImg: null },
    { id: "charmander", cardImg: null },
    { id: "squirtle", cardImg: null },
    { id: "bulbasaur", cardImg: null },
    // TODO Add more Pokemon. need total of 12.
  ]);

  const getCardImages = async () => {
    try {
      const updatedCards = await Promise.all(
        cards.map(async (card) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${card.id}`,
          );
          const data = await response.json();
          return {
            ...card,
            cardImg: data.sprites.front_default,
          };
        }),
      );
      setCards(updatedCards);
    } catch (err) {
      console.log(`Error fetching Pokemon: ${err}`);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCards(shuffled);
  };

  const updateScore = (cardId) => {
    if (chosenCards.includes(cardId)) {
      // Card was already clicked - reset game
      setScore(0);
      setChosenCards([]);
    } else {
      // Card wasn't clicked yet - update score
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
      setChosenCards([...chosenCards, cardId]);
    }
    shuffleCards();
  };

  useEffect(() => {
    getCardImages();
  }, []);

  return (
    <>
      <div className="header">
        <h1>Memory Game</h1>
        <h3>Click each card, but only once.</h3>
        <div className="scoreboard flex justify-center gap-4">
          <p>Current Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </div>
      <div className="gameboard">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => updateScore(card.id)}
            className="cursor-pointer"
          >
            <img src={card.cardImg} alt={card.id} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
