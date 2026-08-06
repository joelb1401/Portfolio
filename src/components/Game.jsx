import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './game-styles.css';
import goatImage from '../assets/goat.png';
import carImage from '../assets/car.png';
import fieldBackground from '../assets/field-background.jpg';
import garageBackground from '../assets/garage-background.jpg';

const getThirdDoor = (doorA, doorB) => [1, 2, 3].find(d => d !== doorA && d !== doorB);

function Game() {
  const navigate = useNavigate();
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [openedDoor, setOpenedDoor] = useState(null);
  const [message, setMessage] = useState('');
  const [isHostThinking, setIsHostThinking] = useState(false);
  const [showSwitchKeepButtons, setShowSwitchKeepButtons] = useState(false);
  const [showReasonContainer, setShowReasonContainer] = useState(false);
  const [showPortfolioButton, setShowPortfolioButton] = useState(false);

  const pendingTimeout = useRef(null);

  const runAfterDelay = useCallback((callback, delay) => {
    if (pendingTimeout.current) clearTimeout(pendingTimeout.current);
    pendingTimeout.current = setTimeout(callback, delay);
  }, []);

  useEffect(() => {
    return () => {
      if (pendingTimeout.current) clearTimeout(pendingTimeout.current);
    };
  }, []);

  // Preload the door-reveal images so they're already cached by the time a
  // door opens, instead of starting the fetch at reveal time.
  useEffect(() => {
    [goatImage, carImage, fieldBackground, garageBackground].forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const updateGameMessage = useCallback((stage, doorNumber = null, openedDoorNumber = null, selectedDoorNumber = null) => {
    const messages = {
      initial: "Choose a door to start.",
      doorSelected: `Door ${doorNumber}, Good choice! Now, let me open a door with a goat behind it.`,
      offerSwitch: `Door ${openedDoorNumber} has a goat. Would you like to stick with door ${selectedDoorNumber} or switch to door ${getThirdDoor(openedDoorNumber, selectedDoorNumber)}?`,
      gameOver: "Game over! Switching doors is the optimal strategy."
    };
    setMessage(messages[stage] || "");
  }, []);

  const resetGame = useCallback(() => {
    setSelectedDoor(null);
    setOpenedDoor(null);
    setIsHostThinking(false);
    setShowSwitchKeepButtons(false);
    setShowReasonContainer(false);
    setShowPortfolioButton(false);
    updateGameMessage('initial');
  }, [updateGameMessage]);

  const selectDoor = useCallback((doorNumber) => {
    if (selectedDoor !== null) return;
    setSelectedDoor(doorNumber);
    setIsHostThinking(true);
    updateGameMessage('doorSelected', doorNumber);

    runAfterDelay(() => {
      const goatDoors = [1, 2, 3].filter(d => d !== doorNumber);
      const newOpenedDoor = goatDoors[Math.floor(Math.random() * goatDoors.length)];
      setOpenedDoor(newOpenedDoor);
      setIsHostThinking(false);
      setShowSwitchKeepButtons(true);
      updateGameMessage('offerSwitch', null, newOpenedDoor, doorNumber);
    }, 3000);
  }, [selectedDoor, updateGameMessage, runAfterDelay]);

  const makeChoice = useCallback((switched) => {
    setShowSwitchKeepButtons(false);

    if (switched) {
      const newSelectedDoor = getThirdDoor(selectedDoor, openedDoor);
      setSelectedDoor(newSelectedDoor);
      setMessage('Why did you switch?');
      setShowReasonContainer(true);
    } else {
      setMessage('Incorrect. You should always switch. The game will restart.');
      runAfterDelay(resetGame, 3000);
    }
  }, [selectedDoor, openedDoor, runAfterDelay, resetGame]);

  const checkReasoning = useCallback((correct) => {
    setShowReasonContainer(false);
    if (correct) {
      setMessage('Correct reasoning! You win!');
      setShowPortfolioButton(true);
    } else {
      setMessage('Incorrect reasoning. The game will restart.');
      runAfterDelay(resetGame, 3000);
    }
  }, [runAfterDelay, resetGame]);

  const handleViewPortfolio = () => {
    navigate('/portfolio');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    updateGameMessage('initial');
  }, [updateGameMessage]);

  const getDoorContent = (doorNumber) => {
    if (openedDoor === doorNumber) {
      return { image: goatImage, alt: "Goat", className: "goat", background: fieldBackground };
    }
    if (showPortfolioButton && doorNumber === selectedDoor) {
      // Reaching this state always means the player switched onto the
      // winning door (the game guarantees a switch wins), so this is
      // always the car.
      return { image: carImage, alt: "Car", className: "prize", background: garageBackground };
    }
    return null;
  };

  return (
    <div className="monty-hall-game">
      <div id="game-container">
        <h1 className="game-title">The Monty Hall Problem</h1>

        <div id="game-explanation">
          Welcome to the Monty Hall Problem! Behind one of these doors is a car, and behind the other two are goats. Choose a door to try and find the car, and then you'll have the option to switch doors. If you win the car, you can view my portfolio! Good luck!
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
                  role="button"
                  tabIndex={selectedDoor === null ? 0 : -1}
                  aria-label={`Door ${doorNumber}`}
                  aria-disabled={selectedDoor !== null}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      selectDoor(doorNumber);
                    }
                  }}
                  style={{
                    transform: selectedDoor === doorNumber && !showPortfolioButton ? 'scale(1.05)' : '',
                  }}
                >
                  {['front', 'back', 'top', 'bottom', 'left', 'right'].map(face => (
                    <div
                      key={face}
                      className={`door-face door-${face}`}
                      data-num={face === 'front' ? doorNumber : undefined}
                    ></div>
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

        <div id="message-container">
          <div id="message">
            {message}
            {isHostThinking && (
              <span className="thinking-dots" aria-hidden="true">
                <span>.</span><span>.</span><span>.</span>
              </span>
            )}
          </div>

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