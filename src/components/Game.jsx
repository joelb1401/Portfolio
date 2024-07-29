import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './game-styles.css';
import goatImage from '../assets/goat.png';
import carImage from '../assets/car.png';
import fieldBackground from '../assets/field-background.jpg';
import garageBackground from '../assets/garage-background.jpg';
import doorImage from '../assets/door.png';
import hostImage from '../assets/host.png';

function Game() {
  const navigate = useNavigate();
  // Game state variables
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [openedDoor, setOpenedDoor] = useState(null);
  const [prizeDoor, setPrizeDoor] = useState(null);
  const [message, setMessage] = useState('');
  const [showSwitchKeepButtons, setShowSwitchKeepButtons] = useState(false);
  const [showReasonContainer, setShowReasonContainer] = useState(false);
  const [showPortfolioButton, setShowPortfolioButton] = useState(false);

  // Update game message based on current stage
  const updateGameMessage = useCallback((stage, doorNumber = null, openedDoorNumber = null, selectedDoorNumber = null) => {
    const messages = {
      initial: "Choose a door to start.",
      doorSelected: `Door ${doorNumber}, Good choice! Now, let me open a door with a goat behind it.`,
      offerSwitch: `Door ${openedDoorNumber} has a goat. Would you like to stick with door ${selectedDoorNumber} or switch to door ${[1, 2, 3].find(d => d !== openedDoorNumber && d !== selectedDoorNumber)}?`,
      gameOver: "Game over! Switching doors is the optimal strategy."
    };
    setMessage(messages[stage] || "");
  }, []);

  // Handle door selection
  const selectDoor = useCallback((doorNumber) => {
    if (selectedDoor !== null) return;
    setSelectedDoor(doorNumber);
    updateGameMessage('doorSelected', doorNumber);

    // Reveal a goat door after a short delay
    setTimeout(() => {
      const goatDoors = [1, 2, 3].filter(d => d !== doorNumber);
      const newOpenedDoor = goatDoors[Math.floor(Math.random() * goatDoors.length)];
      setOpenedDoor(newOpenedDoor);
      setShowSwitchKeepButtons(true);
      updateGameMessage('offerSwitch', null, newOpenedDoor, doorNumber);
    }, 3000);
  }, [selectedDoor, updateGameMessage]);

  // Handle player's decision to switch or keep their door
  const makeChoice = useCallback((switched) => {
    setShowSwitchKeepButtons(false);

    if (switched) {
      const newSelectedDoor = [1, 2, 3].find(d => d !== selectedDoor && d !== openedDoor);
      setSelectedDoor(newSelectedDoor);
      // Set the prize door to be the newly selected door
      setPrizeDoor(newSelectedDoor);
      setMessage('Why did you switch?');
      setShowReasonContainer(true);
    } else {
      setMessage('Incorrect. You should always switch. The game will restart.');
      setTimeout(() => window.location.reload(), 3000);
    }
  }, [selectedDoor, openedDoor]);

  // Check player's reasoning for switching
  const checkReasoning = useCallback((correct) => {
    setShowReasonContainer(false);
    if (correct) {
      setMessage('Correct reasoning! You win!');
      setShowPortfolioButton(true);
    } else {
      setMessage('Incorrect reasoning. The game will restart.');
      setTimeout(() => window.location.reload(), 3000);
    }
  }, []);

  // Navigate to portfolio page
  const handleViewPortfolio = () => {
    navigate('/Portfolio/');
  };

  // Initialize game message on component mount
  useEffect(() => {
    updateGameMessage('initial');
  }, [updateGameMessage]);

  // Determine content behind each door
  const getDoorContent = (doorNumber) => {
    if (openedDoor === doorNumber) {
      return { image: goatImage, alt: "Goat", className: "goat", background: fieldBackground };
    }
    if (showPortfolioButton && doorNumber === selectedDoor) {
      return doorNumber === prizeDoor
        ? { image: carImage, alt: "Car", className: "prize", background: garageBackground }
        : { image: goatImage, alt: "Goat", className: "goat", background: fieldBackground };
    }
    return null;
  };

  return (
    <div className="monty-hall-game">
      <div id="game-container">
        <h1 className="game-title">The Monty Hall Problem</h1>

        <div id="game-explanation">
          Welcome to the Monty Hall Problem! Behind one of these doors is a car, and behind the other two are goats. Choose a door to try and find the car, and then you'll have the option to switch doors. Good luck!
        </div>

        <div id="doors-container">
          {[1, 2, 3].map(doorNumber => {
            const content = getDoorContent(doorNumber);
            return (
              <div key={doorNumber} className="door-frame">
                <div
                  id={`door${doorNumber}`}
                  className={`door ${openedDoor === doorNumber || (showPortfolioButton && doorNumber === selectedDoor) ? 'open' : ''}`}
                  onClick={() => selectDoor(doorNumber)}
                  style={{
                    transform: selectedDoor === doorNumber && !showPortfolioButton ? 'scale(1.05)' : '',
                  }}
                >
                  {/* Door faces */}
                  {['front', 'back', 'top', 'bottom', 'left', 'right'].map(face => (
                    <div key={face} className={`door-face door-${face}`} style={face === 'front' || face === 'back' ? {backgroundImage: `url(${doorImage})`} : {}}></div>
                  ))}
                </div>
                <div className="door-content" style={{
                  backgroundImage: content ? `url(${content.background})` : '',
                  opacity: content ? 1 : 0
                }}>
                  {content && (
                    <img
                      src={content.image}
                      alt={content.alt}
                      className={content.className}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div id="host-character" style={{backgroundImage: `url(${hostImage})`}}></div>

        <div id="message-container">
          <div id="message">{message}</div>

          {showSwitchKeepButtons && (
            <div id="button-container">
              <button onClick={() => makeChoice(true)}>Switch Door</button>
              <button onClick={() => makeChoice(false)}>Keep Door</button>
            </div>
          )}

          {showReasonContainer && (
            <div id="reason-container">
              <button onClick={() => checkReasoning(false)}>
                Why not? It's a 50/50 chance.
              </button>
              <button onClick={() => checkReasoning(true)}>
                It's now more likely that the other door has the prize.
              </button>
            </div>
          )}

          {showPortfolioButton && (
            <div id="portfolio-button-container">
              <button onClick={handleViewPortfolio}>View My Portfolio</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;