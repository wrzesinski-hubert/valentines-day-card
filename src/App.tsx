import { useEffect, useMemo, useRef, useState } from "react";
import Cosmo from "./assets/Cosmo.png";
import Daffodil from "./assets/Daffodil.png";
import Daisy from "./assets/Daisy.png";
import Lavender from "./assets/Lavender.png";
import Lily from "./assets/Lily.png";
import LilyOfTheValley from "./assets/LilyOfTheValley.png";
import Orchid from "./assets/Orchid.png";
import Pansy from "./assets/Pansy.png";
import Poppy from "./assets/Poppy.png";
import Rose from "./assets/Rose.png";
import Sunflower from "./assets/Sunflower.png";
import Tulip from "./assets/Tulip.png";
import "./App.css";

const generateRandomNumbers = (range: number) => {
  const randomNumbers: number[] = [];
  while (randomNumbers.length < 5) {
    const randomNumber = Math.floor(Math.random() * range) + 1;
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }
  return randomNumbers;
};

export const App = () => {
  const arrayOfFlowers = [
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
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [takenFlowers, setTakenFlowers] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const listOfAllFlowers = useMemo(
    () =>
      Array.from({ length: 100 * difficultyLevel }).map(() =>
        Math.floor(Math.random() * arrayOfFlowers.length)
      ),
    [difficultyLevel]
  );
  const randomPlacesForTulips = useMemo(
    () => generateRandomNumbers(100 * difficultyLevel),
    [difficultyLevel]
  );

  useEffect(() => {
    setTakenFlowers([]);
  }, [difficultyLevel]);

  return (
    <div className="flowers-wrapper">
      <div className="difficulty-wrapper">
        <div className="difficulty" onClick={() => setDifficultyLevel(1)}>
          Easy
        </div>
        <div className="difficulty" onClick={() => setDifficultyLevel(2)}>
          Medium
        </div>
        <div className="difficulty" onClick={() => setDifficultyLevel(3)}>
          Hard
        </div>
      </div>
      <div
        className="flowers-grid"
        style={{ gridTemplateColumns: `repeat(${10 * difficultyLevel},25px)` }}
        ref={ref}
      >
        {listOfAllFlowers.map((flower, index) => (
          <div
            key={index}
            className={
              "single-flower-wrapper " +
              (takenFlowers.includes(index) ? "single-flower-taken" : "")
            }
            style={
              takenFlowers.includes(index)
                ? {
                    transform: "translateY(150px)",
                  }
                : {}
            }
          >
            <img
              src={
                randomPlacesForTulips.includes(index)
                  ? Tulip
                  : arrayOfFlowers[flower]
              }
              onClick={() => {
                setTakenFlowers((prev) => [...prev, index]);
                console.log(
                  ref.current?.offsetTop,
                  ref.current?.getClientRects()
                );
              }}
              alt="flower"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
