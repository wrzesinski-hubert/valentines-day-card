import { useEffect, useMemo, useState } from "react";
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
import Ja from "./assets/1.jpeg";
import "./App.scss";

const NUMBER_OF_TULIPS = 5;

const generateRandomNumbers = (range: number) => {
  const randomNumbers: number[] = [];
  while (randomNumbers.length < NUMBER_OF_TULIPS) {
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
  const [clickedFlowers, setClickedFlowers] = useState<number[]>([]);
  const listOfLetters = ["K", "O", "C", "H", "A", "M"];

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
    setClickedFlowers([]);
  }, [difficultyLevel]);

  const handleFlowerClick = (index: number) => {
    if (!clickedFlowers.includes(index)) {
      setClickedFlowers((prev) => [...prev, index]);
    }
  };

  return (
    <>
      {clickedFlowers.length === NUMBER_OF_TULIPS && (
        <div className="container-absolute">
          <div className="container-relative">
            {Array.from({ length: 200 }, (_, index) => (
              <div className="circle-container">
                <div className="circle" />
              </div>
            ))}
          </div>
        </div>
      )}
      <>
        {clickedFlowers.length === NUMBER_OF_TULIPS ? (
          <>
            <div className="flowers-wrapper">
              <img src={Ja} width={400} />
              <p className="message">Will u be my valentine? 🥺</p>
            </div>
          </>
        ) : (
          <div className="flowers-wrapper">
            <div className="title">
              Find all {NUMBER_OF_TULIPS - clickedFlowers.length} tulips{" "}
              <img src={Tulip} />
            </div>

            <div className="difficulty-wrapper">
              <div
                className={
                  "difficulty-button " +
                  (difficultyLevel === 1 ? "selected" : "")
                }
                onClick={() => setDifficultyLevel(1)}
              >
                Easy
              </div>
              <div
                className={
                  "difficulty-button " +
                  (difficultyLevel === 2 ? "selected" : "")
                }
                onClick={() => setDifficultyLevel(2)}
              >
                Medium
              </div>
              <div
                className={
                  "difficulty-button " +
                  (difficultyLevel === 3 ? "selected" : "")
                }
                onClick={() => setDifficultyLevel(3)}
              >
                Hard
              </div>
            </div>

            <div
              className="flowers-grid"
              style={{
                gridTemplateColumns: `repeat(${10 * difficultyLevel}, 25px)`,
              }}
            >
              {listOfAllFlowers.map((flower, index) => {
                const isTulip = randomPlacesForTulips.includes(index);
                if (clickedFlowers.includes(index))
                  return (
                    <div key={index} className="single-flower-wrapper">
                      💚
                    </div>
                  );
                return (
                  <div key={index} className="single-flower-wrapper">
                    <img
                      src={isTulip ? Tulip : arrayOfFlowers[flower]}
                      onClick={() => isTulip && handleFlowerClick(index)}
                      alt="flower"
                    />
                  </div>
                );
              })}
            </div>

            <div className="clicked-flowers">
              {clickedFlowers.map((index) => (
                <div key={index} className="taken">
                  <img
                    src={
                      randomPlacesForTulips.includes(index)
                        ? Tulip
                        : arrayOfFlowers[listOfAllFlowers[index]]
                    }
                    alt="flower"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    </>
  );
};
