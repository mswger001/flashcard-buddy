// src/Flashcard.js
import React, { useState } from "react";
import "./Flash.css"; // Optional CSS for styling

const Flashcard = ({ flashcard, onNext, currentIndex, totalCards }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <div
        className={`flashcard ${isFlipped ? "flipped" : ""}`}
        onClick={handleFlip}
      >
        {!isFlipped ? (
          <div className="front">
            <h2 className="mistake-type">{flashcard.Mistake_Type}</h2>
            <div className="original-sentence">
              <h3>Original Sentence:</h3>
              <h4>{flashcard.Original_Sentence}</h4>
            </div>
          </div>
        ) : (
          <div className="back">
            <div className="backR">
              <h2 className="mistake-type">{flashcard.Mistake_Type}</h2>
              <div className="original-sentence">
                <h3>Corrected Sentence:</h3>
                <p>{flashcard.Corrected_Sentence}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
