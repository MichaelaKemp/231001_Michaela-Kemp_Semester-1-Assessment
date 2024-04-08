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
    setComparisonStarted(true);
  };

  return (
    <div className="comparison-container">
      <h2>Comparison Page</h2>
      <button onClick={compareBodies} disabled={selectedBodies.length !== 2}>Compare</button>
      {comparisonStarted && (
        <>
          <h2>Selected Bodies</h2>
          <div className="selected-bodies">
            {selectedBodies.map((bodyName, index) => (
              <div key={index}>{bodyName}</div>
            ))}
          </div>
        </>
      )}
      <h2>Celestial Bodies</h2>
      {!comparisonStarted && <HorizonsData onSelect={handleSelect} showButton={true} />}
    </div>
  );
}

export default Comparison;
