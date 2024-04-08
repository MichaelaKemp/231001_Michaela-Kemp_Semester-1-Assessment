import React, { useState } from 'react';
import HorizonsData from './HorizonsData';

const Comparison = () => {
  const [selectedBodies, setSelectedBodies] = useState([]);
  const [comparisonStarted, setComparisonStarted] = useState(false);

  const handleSelect = (bodyName) => {
    if (selectedBodies.includes(bodyName)) {
      setSelectedBodies(selectedBodies.filter(body => body !== bodyName));
    } else {
      setSelectedBodies([...selectedBodies, bodyName]);
    }
  };

  const compareBodies = () => {
    // Your comparison logic here
    setComparisonStarted(true);
  };

  return (
    <div className="comparison-container">
      <h2>Comparison Page</h2>
      <button onClick={compareBodies} disabled={selectedBodies.length !== 2}>Compare</button>
      {comparisonStarted && (
        <h2>Selected Bodies</h2>
      )}
      <div className="comparison-bodies">
        {Object.keys(HorizonsData).map((bodyName, index) => {
          if (selectedBodies.includes(bodyName)) {
            return <div key={index}>{bodyName}</div>;
          }
          return null;
        })}
      </div>
      <h2>Celestial Bodies</h2>
      <HorizonsData onSelect={handleSelect} showButton={!comparisonStarted} />
    </div>
  );
}

export default Comparison;
