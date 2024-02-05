import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function App() {

  const [position, setPosition] = useState({ x: null, y: null });
  const [direction, setDirection] = useState(null);

  const handlePlace = (x, y, f) => {
    if (x >= 0 && x < 5 && y >= 0 && y < 5) {
      setPosition({ x, y });
      setDirection(f);
    }
  };
  const handleMove = () => {
    if (!position.x || !position.y || !direction) return;

    switch (direction) {
      case 'NORTH':
        if (position.y < 4) setPosition({ ...position, y: position.y + 1 });
        break;
      case 'EAST':
        if (position.x < 4) setPosition({ ...position, x: position.x + 1 });
        break;
      case 'SOUTH':
        if (position.y > 0) setPosition({ ...position, y: position.y - 1 });
        break;
      case 'WEST':
        if (position.x > 0) setPosition({ ...position, x: position.x - 1 });
        break;
      default:
        break;
    }
  };
  const handleLeft = () => {
    if (!direction) return;

    const leftRotation = {
      NORTH: 'WEST',
      WEST: 'SOUTH',
      SOUTH: 'EAST',
      EAST: 'NORTH',
    };
    setDirection(leftRotation[direction]);
  };
  const handleRight = () => {
    if (!direction) return;

    const rightRotation = {
      NORTH: 'EAST',
      EAST: 'SOUTH',
      SOUTH: 'WEST',
      WEST: 'NORTH',
    };
    setDirection(rightRotation[direction]);
  };
  const handleReport = () => {
    if (!position || !direction) return 'Robot not placed';
    return `${position.x},${position.y},${direction}`;
  };
  return (
    <div className="robot-simulator">
    <div className="robot" style={{ gridRow: 5 - (position?.y || 0), gridColumn: position?.x || 0 }}>
      <div className={`robot-${direction?.toLowerCase()}`}></div>
    </div>
    <div className="controls">
      <button onClick={() => handlePlace(0, 0, 'NORTH')}>Place 0,0,NORTH</button>
      <button onClick={handleMove}>Move</button>
      <button onClick={handleLeft}>Left</button>
      <button onClick={handleRight}>Right</button>
      <button onClick={() => console.log(handleReport())}>Report</button>
    </div>
  </div>

  );
}

export default App;
