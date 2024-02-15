import { useState, useEffect, useRef } from 'react';
import './CustomInputRange.css';

export const CustomInputRange = ({ onChange }) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);
  const [dragging, setDragging] = useState(null);
  const rangeRef = useRef(null);
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

  const handleMouseDown = (event, handler) => {
    event.preventDefault();
    setDragging(handler);
  };

  const handleMouseUp = () => {
    setDragging(null);
    onChange({ minPrice: minValue, maxPrice: maxValue });
  };

  const handleMouseMove = (event) => {
    if (dragging === 'min') {
      const newValue = calculateNewValue(event.clientX);
      if (newValue < maxValue - 25) setMinValue(parseInt(newValue));
    } else if (dragging === 'max') {
      const newValue = calculateNewValue(event.clientX);
      if (newValue > minValue + 25) setMaxValue(parseInt(newValue));
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      if (event.target === minInputRef.current) {
        if (value >= 0 && value < maxValue - 25) setMinValue(value);
      } else if (event.target === maxInputRef.current) {
        if (value <= 1000 && value > minValue + 25) setMaxValue(value);
      }
    }
  };

  const calculateNewValue = (clientX) => {
    const rect = rangeRef.current.getBoundingClientRect();
    const positionX = clientX - rect.left;
    const percentage = (positionX / rect.width) * 100;
    const newValue = (percentage / 100) * 1000; // Assuming 1000 is the maximum value
    return newValue;
  };

  useEffect(() => {
    const handleDocumentMouseUp = () => {
      if (dragging) {
        setDragging(null);
        onChange({ minPrice: minValue, maxPrice: maxValue });
      }
    };

    document.addEventListener('mouseup', handleDocumentMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };
  }, [dragging, minValue, maxValue, onChange]);

  return (
    <div className="price-selector" ref={rangeRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div className="range-bar">
        <div
          className="handle min-handle"
          style={{ left: `${(minValue / 1000) * 100}%` }}
          onMouseDown={(event) => handleMouseDown(event, 'min')}
        />
        <div
          className="handle max-handle"
          style={{ left: `${(maxValue / 1000) * 100}%` }}
          onMouseDown={(event) => handleMouseDown(event, 'max')}
        />
        <div className="selected-range" style={{ width: `${(maxValue - minValue) / 10}%`, left: `${(minValue / 1000) * 100}%` }} />
      </div>
      <span>
        ${minValue} - ${maxValue}
      </span>
      <div className="input-range-controls">
        <input type="number" value={minValue} onChange={handleInputChange} ref={minInputRef} />
        <span>$0</span>
        <input type="number" value={maxValue} onChange={handleInputChange} ref={maxInputRef} />
        <span>${maxValue + (maxValue * 0.25)}</span>
      </div>
    </div>
  );
};
