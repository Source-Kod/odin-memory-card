import { useState, useEffect } from "react";

interface Card {
  id: string;
  cardImg: string | null;
}

function App() {
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [chosenCards, setChosenCards] = useState<string[]>([]);
  const [cards, setCards] = useState<Card[]>([
    { id: "ditto", cardImg: null },
    { id: "pikachu", cardImg: null },
    { id: "charmander", cardImg: null },
    { id: "squirtle", cardImg: null },
    { id: "bulbasaur", cardImg: null },
    { id: "eevee", cardImg: null },
    { id: "mewtwo", cardImg: null },
    { id: "snorlax", cardImg: null },
    { id: "gyarados", cardImg: null },
    { id: "dragonite", cardImg: null },
    { id: "gengar", cardImg: null },
    { id: "charizard", cardImg: null },
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

  const updateScore = (cardId: string) => {
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
      <div className="header flex flex-col items-center">
        <h1 className="text-2xl font-bold">Memory Game</h1>
        <h3 className="text-xl">Click each card, but only once.</h3>
        {/* scoreboard */}
        <div className="flex justify-center gap-4">
          <p className="text-xl">Current Score: {score}</p>
          <p className="text-xl">Best Score: {bestScore}</p>
        </div>
      </div>
      {/* gameboard */}
      <div className="mx-auto grid max-w-5xl grid-cols-4 gap-8 p-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex aspect-square cursor-pointer justify-center rounded-xl bg-neutral-400 shadow-black hover:shadow-lg"
            onClick={() => updateScore(card.id)}
          >
            <img src={card.cardImg ?? ""} alt={card.id} className="" />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
