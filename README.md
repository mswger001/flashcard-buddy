

# Spaced Repetition Flashcard App

## Overview
This project is a React application that implements a spaced repetition system for flashcards, designed to help students learn from their mistakes in grammar and vocabulary. The app allows users to input their student ID and view flashcards containing original sentences and their corrections.

## Features
- **User Input:** Students can enter their ID to retrieve their respective flashcards.
- **Flashcard Review:** Users can see original sentences with mistakes and attempt to correct them.
- **Answer Checking:** After submitting an answer, the app provides immediate feedback on correctness.
- **Spaced Repetition:** Cards are reviewed based on a spaced repetition algorithm to optimize learning.
- **Progress Tracking:** The app updates the review interval based on user feedback (easy, medium, hard).

## Technologies Used
- **React:** For building the user interface.
- **Day.js:** For date manipulation.
- **CSS:** For styling the application.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd spaced-repetition-flashcards
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## File Structure
- `src/`
  - `App.js`: Main component that handles state and logic for the flashcard app.
  - `Flashcard.js`: Component to display individual flashcards.
  - `styles.css`: CSS styles for the application.
  - `data.js`: Sample data for flashcards (can be moved to a separate file if necessary).

## Usage
1. Upon launching the app, enter your student ID in the input field.
2. Review the flashcards presented.
3. Type your corrected sentence in the answer input box and click "Submit Answer."
4. Receive feedback on your answer and grade your understanding (easy, medium, hard).
5. The app will adjust the review intervals based on your performance.

## Future Enhancements
- Implement user authentication to save individual user progress.
- Add a database to store user data and flashcard information.
- Enhance the UI with animations and improved styling.
- Include audio pronunciation for vocabulary flashcards.

## Contribution
Feel free to fork the repository and submit pull requests. For any issues, please raise them in the issues section.

