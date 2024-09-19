import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./styles.css"; // Ensure your styles for flashcards are in this file
import Flashcard from "./Flashcard";
// Sample transformed data
const Data = [
  {
    Student_ID: 1,
    Mistake_Type: "Grammar",
    Original_Sentence: "I goes to school",
    Corrected_Sentence: "I go to school",
  },
  {
    Student_ID: 1,
    Mistake_Type: "Vocabulary",
    Original_Sentence: "She took the wrong bus",
    Corrected_Sentence: "She missed the bus",
  },
  {
    Student_ID: 1,
    Mistake_Type: "Grammar",
    Original_Sentence: "They is my friends",
    Corrected_Sentence: "They are my friends",
  },
  {
    Student_ID: 2,
    Mistake_Type: "Vocabulary",
    Original_Sentence: "He miss the bus",
    Corrected_Sentence: "He missed the bus",
  },
  {
    Student_ID: 2,
    Mistake_Type: "Grammar",
    Original_Sentence: "She were late",
    Corrected_Sentence: "She was late",
  },
  {
    Student_ID: 2,
    Mistake_Type: "Grammar",
    Original_Sentence: "They doesn't know",
    Corrected_Sentence: "They don't know",
  },
  {
    Student_ID: 3,
    Mistake_Type: "Vocabulary",
    Original_Sentence: "He don't have any",
    Corrected_Sentence: "He doesn't have any",
  },
  {
    Student_ID: 3,
    Mistake_Type: "Grammar",
    Original_Sentence: "She are happy",
    Corrected_Sentence: "She is happy",
  },
  {
    Student_ID: 3,
    Mistake_Type: "Vocabulary",
    Original_Sentence: "We doesn't like it",
    Corrected_Sentence: "We don't like it",
  },
  {
    Student_ID: 4,
    Mistake_Type: "Grammar",
    Original_Sentence: "He has car",
    Corrected_Sentence: "He has a car",
  },
  {
    Student_ID: 4,
    Mistake_Type: "Grammar",
    Original_Sentence: "They has a house",
    Corrected_Sentence: "They have a house",
  },
  {
    Student_ID: 4,
    Mistake_Type: "Vocabulary",
    Original_Sentence: "He bringed the book",
    Corrected_Sentence: "He brought the book",
  },
  {
    Student_ID: 5,
    Mistake_Type: "Vocabulary",
    Original_Sentence: "I taked the bus",
    Corrected_Sentence: "I took the bus",
  },
  {
    Student_ID: 5,
    Mistake_Type: "Grammar",
    Original_Sentence: "She have been there",
    Corrected_Sentence: "She has been there",
  },
  {
    Student_ID: 5,
    Mistake_Type: "Grammar",
    Original_Sentence: "They was there",
    Corrected_Sentence: "They were there",
  },
  {
    Student_ID: 1,
    Mistake_Type: "Vocabulary",
    Original_Sentence: "She learn fast",
    Corrected_Sentence: "She learns fast",
  },
  {
    Student_ID: 1,
    Mistake_Type: "Grammar",
    Original_Sentence: "We was playing",
    Corrected_Sentence: "We were playing",
  },
  {
    Student_ID: 2,
    Mistake_Type: "Grammar",
    Original_Sentence: "He bring a gift",
    Corrected_Sentence: "He brought a gift",
  },
  {
    Student_ID: 2,
    Mistake_Type: "Vocabulary",
    Original_Sentence: "She taked the wrong train",
    Corrected_Sentence: "She took the wrong train",
  },
  {
    Student_ID: 3,
    Mistake_Type: "Grammar",
    Original_Sentence: "He don't like it",
    Corrected_Sentence: "He doesn't like it",
  },
  {
    Student_ID: 3,
    Mistake_Type: "Vocabulary",
    Original_Sentence: "She went to the sea",
    Corrected_Sentence: "She went to the beach",
  },
  {
    Student_ID: 4,
    Mistake_Type: "Grammar",
    Original_Sentence: "They isn't coming",
    Corrected_Sentence: "They aren't coming",
  },
  {
    Student_ID: 4,
    Mistake_Type: "Vocabulary",
    Original_Sentence: "He eat the apple",
    Corrected_Sentence: "He ate the apple",
  },
  {
    Student_ID: 5,
    Mistake_Type: "Grammar",
    Original_Sentence: "She haven't seen him",
    Corrected_Sentence: "She hasn't seen him",
  },
  {
    Student_ID: 5,
    Mistake_Type: "Vocabulary",
    Original_Sentence: "They gone to the party",
    Corrected_Sentence: "They went to the party",
  },
];

const App = () => {
  const [studentId, setStudentId] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Function to create flashcards from mistakes
  const createFlashcardsFromMistakes = (data) => {
    return data.map((mistake) => ({
      Student_ID: mistake.Student_ID,
      Original_Sentence: mistake.Original_Sentence,
      Corrected_Sentence: mistake.Corrected_Sentence,
      interval: 1,
      lastReviewed: null,
      easeFactor: 2.5,
    }));
  };

  // Function to filter flashcards by student ID and spaced repetition
  const filterFlashcards = (studentId, allFlashcards) => {
    // Filter flashcards by student ID
    const studentFlashcards = allFlashcards.filter(
      (f) => f.Student_ID == studentId
    );

    console.log("Student Flashcards:", studentFlashcards);

    // Calculate due flashcards
    const dueFlashcards = studentFlashcards.filter((card) => {
      if (!card.lastReviewed) return true; // If there's no lastReviewed date, consider it due
      const nextReview = dayjs(card.lastReviewed).add(
        Math.ceil(card.interval * card.easeFactor),
        "day"
      );
      return dayjs().isAfter(nextReview); // Check if the card is due
    });

    // If there are due flashcards, return them sorted by next review date
    if (dueFlashcards.length > 0) {
      return dueFlashcards.sort((a, b) => {
        const nextReviewA = dayjs(a.lastReviewed).add(
          Math.ceil(a.interval * a.easeFactor),
          "day"
        );
        const nextReviewB = dayjs(b.lastReviewed).add(
          Math.ceil(b.interval * b.easeFactor),
          "day"
        );
        return nextReviewA - nextReviewB; // Sort by next review date
      });
    }

    // If no cards are due, calculate next review dates for all cards
    const sortedFlashcards = studentFlashcards
      .map((card) => {
        const nextReview = dayjs(card.lastReviewed).add(
          Math.ceil(card.interval * card.easeFactor),
          "day"
        );
        return { ...card, nextReview }; // Add nextReview date to card object
      })
      .sort((a, b) => a.nextReview - b.nextReview); // Sort by next review date

    const shortestTime = sortedFlashcards[0]?.nextReview;

    // Return all flashcards that have the soonest next review date
    const soonestFlashcards = sortedFlashcards.filter((card) =>
      card.nextReview.isSame(shortestTime)
    );

    // You can return all soonest flashcards or just one randomly
    return soonestFlashcards; // Return all soonest flashcards in order
  };

  // // Function to filter flashcards by student ID and spaced repetition
  // const filterFlashcards = (studentId, allFlashcards) => {
  //   const studentFlashcards = allFlashcards.filter(
  //     (f) => f.Student_ID == studentId
  //   );

  //   console.log(studentFlashcards);

  //   const dueFlashcards = studentFlashcards.filter((card) => {
  //     if (!card.lastReviewed) return true;
  //     const nextReview = dayjs(card.lastReviewed).add(
  //       Math.ceil(card.interval * card.easeFactor),
  //       "day"
  //     );
  //     return dayjs().isAfter(nextReview);
  //   });

  //   if (dueFlashcards.length > 0) {
  //     return dueFlashcards;
  //   }

  //   const sortedFlashcards = studentFlashcards
  //     .map((card) => {
  //       const nextReview = dayjs(card.lastReviewed).add(
  //         Math.ceil(card.interval * card.easeFactor),
  //         "day"
  //       );
  //       return { ...card, nextReview };
  //     })
  //     .sort((a, b) => a.nextReview - b.nextReview);

  //   const shortestTime = sortedFlashcards[0]?.nextReview;

  //   const soonestFlashcards = sortedFlashcards.filter((card) =>
  //     card.nextReview.isSame(shortestTime)
  //   );

  //   const randomIndex = Math.floor(Math.random() * soonestFlashcards.length);

  //   return [soonestFlashcards[randomIndex]];
  // };

  // Function to select the next flashcard due for review
  const selectNextCard = (dueFlashcards) => {
    if (dueFlashcards.length > 0) {
      const randomIndex = Math.floor(Math.random() * dueFlashcards.length);
      return dueFlashcards[randomIndex];
    }
    return null;
  };

  useEffect(() => {
    const mistakeFlashcards = createFlashcardsFromMistakes(Data);
    setFlashcards(mistakeFlashcards);

    if (studentId) {
      const dueFlashcards = filterFlashcards(studentId, mistakeFlashcards);
      const nextCard = selectNextCard(dueFlashcards);
      setCurrentCard(nextCard);
      setIsAnswerChecked(false);
      setAnswer("");
    } else {
      setFlashcards([]);
      setCurrentCard(null);
    }
  }, [studentId]);

  const handleStudentIdChange = (e) => {
    const id = e.target.value;
    if (!isNaN(id) && id.trim() !== "") {
      setStudentId(id);
    } else {
      setStudentId(""); // Reset if invalid input
    }
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleCheckAnswer = () => {
    const isAnswerCorrect =
      answer.trim().toLowerCase() ===
      currentCard.Corrected_Sentence.trim().toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setIsAnswerChecked(true);
  };

  const handleReview = (grade) => {
    const updatedCard = { ...currentCard };
    const size_cards = filterFlashcards(studentId, flashcards).length;

    if (grade === "easy") {
      updatedCard.interval = Math.ceil(
        updatedCard.interval * updatedCard.easeFactor + size_cards
      );
      updatedCard.easeFactor += 0.15;
    } else if (grade === "medium") {
      updatedCard.interval = Math.ceil(
        updatedCard.interval * updatedCard.easeFactor + size_cards / 2
      );
      updatedCard.easeFactor += 0.1;
    } else if (grade === "hard") {
      updatedCard.interval = Math.max(
        1,
        Math.ceil(updatedCard.interval * updatedCard.easeFactor + 1)
      );
      updatedCard.easeFactor = Math.max(1.3, updatedCard.easeFactor - 0.15);
    }

    updatedCard.lastReviewed = dayjs().format();

    // Update the flashcards state
    let updatedFlashcards = flashcards.map((flashcard) => {
      // console.log(updatedCard);
      if (flashcard.Original_Sentence == currentCard.Original_Sentence) {
        return updatedCard; // Update the reviewed card
      } else {
        // Subtract 1 from all other cards' intervals
        // return flashcard;

        flashcard.interval = Math.max(1, flashcard.interval - 1); // Prevent negative interval
        return flashcard; // Return the modified flashcard
      }
    });

    const fsc = filterFlashcards(studentId, updatedFlashcards);
    // console.log(fsc);
    setFlashcards(updatedFlashcards);

    setCurrentCard(selectNextCard(fsc));
    setIsAnswerChecked(false);
    setAnswer("");
  };

  return (
    <div className="App">
      <h2>Spaced Repetition Flashcard App</h2>
      <input
        type="number"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={handleStudentIdChange}
        className="student-input"
      />
      {currentCard ? (
        <>
          <Flashcard flashcard={currentCard} />

          <div className="answer-section">
            {!isAnswerChecked ? (
              <>
                <input
                  type="text"
                  value={answer}
                  onChange={handleAnswerChange}
                  placeholder="Type your corrected sentence"
                  className="answer-input"
                />
                <button onClick={handleCheckAnswer} className="submit-btn">
                  Submit Answer
                </button>
              </>
            ) : (
              <>
                {isCorrect ? (
                  <p className="correct">Correct!</p>
                ) : (
                  <p className="incorrect">
                    Incorrect! The correct sentence is:{" "}
                    {currentCard.Corrected_Sentence}
                  </p>
                )}
                <div className="review-buttons">
                  <button onClick={() => handleReview("easy")}>Easy</button>
                  <button onClick={() => handleReview("medium")}>Medium</button>
                  <button onClick={() => handleReview("hard")}>Hard</button>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        studentId && <p>No flashcards due for Student ID {studentId}</p>
      )}
    </div>
  );
};

export default App;
