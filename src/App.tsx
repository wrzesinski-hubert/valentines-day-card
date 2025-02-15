import { useCallback, useEffect, useMemo, useState } from "react";
import Cosmo from "./images/Cosmo.png";
import Daffodil from "./images/Daffodil.png";
import Daisy from "./images/Daisy.png";
import Lavender from "./images/Lavender.png";
import Lily from "./images/Lily.png";
import LilyOfTheValley from "./images/LilyOfTheValley.png";
import Orchid from "./images/Orchid.png";
import Pansy from "./images/Pansy.png";
import Poppy from "./images/Poppy.png";
import Rose from "./images/Rose.png";
import Sunflower from "./images/Sunflower.png";
import Tulip from "./images/Tulip.png";
import Ja from "./images/1.jpeg";
import Ja2 from "./images/2.jpeg";
import "./App.scss";

const NUMBER_OF_TULIPS = 5;
const GRID_SIZE = 100;
const FLOWERS = [
  Cosmo,
  Daffodil,
  Daisy,
  Lavender,
  Lily,
  LilyOfTheValley,
  Orchid,
  Pansy,
  Poppy,
  Rose,
  Sunflower,
];
const ja = [Ja, Ja2, Ja2];

const generateRandomNumbers = (range: number) => {
  const numbers = new Set<number>();
  while (numbers.size < NUMBER_OF_TULIPS) {
    numbers.add(Math.floor(Math.random() * range));
  }
  return Array.from(numbers);
};

const DifficultyButton = ({
  level,
  selected,
  onClick,
}: {
  level: number;
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    className={`difficulty-button ${selected ? "selected" : ""}`}
    onClick={onClick}
  >
    {["Easy", "Medium", "Hard"][level - 1]}
  </div>
);

export const App = () => {
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [clickedFlowers, setClickedFlowers] = useState<number[]>([]);

  const gridSize = GRID_SIZE * difficultyLevel;

  const flowerGrid = useMemo(
    () =>
      Array.from({ length: gridSize }, () =>
        Math.floor(Math.random() * FLOWERS.length)
      ),
    [difficultyLevel]
  );

  const randomTulipPositions = useMemo(
    () => generateRandomNumbers(gridSize),
    [difficultyLevel]
  );

  useEffect(() => setClickedFlowers([]), [difficultyLevel]);

  const handleFlowerClick = useCallback(
    (index: number) => {
      if (!clickedFlowers.includes(index)) {
        setClickedFlowers((prev) => [...prev, index]);
      }
    },
    [clickedFlowers]
  );

  const gameCompleted = clickedFlowers.length === NUMBER_OF_TULIPS;

  return (
    <>
      {gameCompleted && (
        <div className="container-absolute">
          <div className="container-relative">
            {Array.from({ length: 200 }).map((_, i) => (
              <div key={i} className="circle-container">
                <div className="circle" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="game-wrapper">
        {gameCompleted ? (
          <>
            <img
              src={ja[difficultyLevel - 1]}
              width={400}
              className="ja-photo"
            />
            <p className="message">Will u be my valentine? 🥺</p>
          </>
        ) : (
          <>
            <div className="title">
              Find all {NUMBER_OF_TULIPS - clickedFlowers.length} tulips{" "}
              <img src={Tulip} alt="tulip" />
            </div>

            <div className="difficulty-wrapper">
              {[1, 2, 3].map((level) => (
                <DifficultyButton
                  key={level}
                  level={level}
                  selected={difficultyLevel === level}
                  onClick={() => setDifficultyLevel(level)}
                />
              ))}
            </div>

            <div
              className="flowers-grid"
              style={{ gridTemplateColumns: `repeat(10, 25px)` }}
            >
              {flowerGrid.map((flowerIndex, index) => {
                const isTulip = randomTulipPositions.includes(index);
                return (
                  <div key={index} className="single-flower-wrapper">
                    {clickedFlowers.includes(index) ? (
                      "💚"
                    ) : (
                      <img
                        src={isTulip ? Tulip : FLOWERS[flowerIndex]}
                        onClick={() => isTulip && handleFlowerClick(index)}
                        alt="flower"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="clicked-flowers">
              {clickedFlowers.map((index) => (
                <div key={index} className="taken">
                  <img
                    src={
                      randomTulipPositions.includes(index)
                        ? Tulip
                        : FLOWERS[flowerGrid[index]]
                    }
                    alt="flower"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
