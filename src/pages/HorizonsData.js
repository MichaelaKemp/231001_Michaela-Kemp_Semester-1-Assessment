import React, { useState, useEffect } from 'react';

export const fetchHorizonsData = async () => {
    try {
        const targetIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const fetchedData = [];

        for (const id of targetIDs) {
            const response = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND=%22${id}%3B%22&EPHEM_TYPE=OBSERVER&OBJ_DATA=YES&MAKE_EPHEM=YES&CENTER=Geocentric`);
            if (!response.ok) {
                throw new Error(`Failed to fetch data for ID ${id}`);
            }
            const jsonData = await response.json();
            fetchedData.push(jsonData.result);
        }

        return fetchedData;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const extractParameters = (result) => {
    const lines = result.split('\n');
    console.log('Lines:', lines);

    const parameters = {};
    let rotationalPeriodSet = false;

    lines.forEach(line => {
        if (line.includes('JPL/HORIZONS')) {
            const startIndex = line.indexOf('JPL/HORIZONS') + 'JPL/HORIZONS'.length;
            const endIndex = line.indexOf(')', startIndex);
            parameters['Name'] = line.substring(startIndex, endIndex + 1).trim();
        } else if (line.includes('Soln.date')) {
            const startIndex = line.indexOf('Soln.date') + 'Soln.date'.length;
            const colonIndex = line.indexOf(':');
            const hashtagIndex = line.indexOf('#', colonIndex);
            parameters['Date last seen'] = line.substring(startIndex + 1, hashtagIndex).trim();
        } else if (line.includes('IN=')) {
            const startIndex = line.indexOf('IN=') + 'IN='.length;
            const firstSpaceIndex = line.indexOf(' ', startIndex);
            const secondSpaceIndex = line.indexOf(' ', firstSpaceIndex + 1);
            parameters['Inclination'] = line.substring(startIndex, secondSpaceIndex).trim();
        } else if (line.includes(' PER=')) {
            const startIndex = line.indexOf(' PER=') + ' PER='.length;
            const firstSpaceIndex = line.indexOf(' ', startIndex);
            const secondSpaceIndex = line.indexOf(' ', firstSpaceIndex + 1);
            parameters['Orbital Period'] = line.substring(startIndex, secondSpaceIndex).trim();
        } else if (line.includes('ROTPER=')) {
            const rotIndex = line.indexOf('ROTPER=');
            const startIndex = rotIndex + 'ROTPER='.length;
            const rotEndIndex = line.indexOf(' ', startIndex + 1);

            const value = line.substring(startIndex, rotEndIndex).trim();
            console.log(':', value);
            console.log('ROT= start index:', startIndex);
            console.log('ROT= end index:', rotEndIndex);

            if (!rotationalPeriodSet) {
                parameters['Rotational Period'] = value;
                rotationalPeriodSet = true;
            } else {
                const radIndex = line.indexOf('RAD=');
                if (radIndex !== -1) {
                    const radStartIndex = radIndex + 'RAD='.length;
                    const radEndIndex = line.indexOf(' ', radStartIndex + 1);
                    const radValue = line.substring(radStartIndex, radEndIndex).trim();
                    parameters['Radius'] = radValue;
                }
            }
        } else if (line.includes('EC=')) {
            const startIndex = line.indexOf('EC=') + 'EC='.length;
            const firstSpaceIndex = line.indexOf(' ', startIndex);
            const secondSpaceIndex = line.indexOf(' ', firstSpaceIndex + 1);
            parameters['Eccentricity'] = line.substring(startIndex, secondSpaceIndex).trim();
        } else if (line.includes('A=')) {
            const startIndex = line.indexOf('A=') + 'A='.length;
            const firstSpaceIndex = line.indexOf(' ', startIndex);
            const secondSpaceIndex = line.indexOf(' ', firstSpaceIndex + 1);
            parameters['Semi-Major Axis'] = line.substring(startIndex, secondSpaceIndex).trim();
        }
    });

    return parameters;
};

function HorizonsData({ onSelect, showButton }) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCards, setSelectedCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await fetchHorizonsData();
                setData(fetchedData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const handleCardClick = (cardName) => {
        if (onSelect) {
            onSelect(cardName);
        }
        if (!selectedCards.includes(cardName)) {
            setSelectedCards([...selectedCards, cardName]);
        } else {
            setSelectedCards(selectedCards.filter((selectedCard) => selectedCard !== cardName));
        }
    };

    const renderParameters = () => {
        if (!data || data.length === 0) return null;

        return (
            <div>
                {data.map((result, index) => (
                    <div key={index} className="card">
                        <p>Name: {extractParameters(result).Name}</p>
                        <p>Date last seen: {extractParameters(result)['Date last seen']}</p>
                        <p>Inclination: {extractParameters(result).Inclination}</p>
                        <p>Orbital Period: {extractParameters(result)['Orbital Period']}</p>
                        <p>Rotational Period: {extractParameters(result)['Rotational Period']}</p>
                        <p>Eccentricity: {extractParameters(result).Eccentricity}</p>
                        <p>Semi-Major Axis: {extractParameters(result)['Semi-Major Axis']}</p>
                        <p>Radius: {extractParameters(result).Radius}</p>
                        {showButton && (
                            <button onClick={() => handleCardClick(extractParameters(result).Name)}>
                                {selectedCards.includes(extractParameters(result).Name) ? 'Deselect' : 'Select'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <h2>Celestial Bodies</h2>
            {renderParameters()}
        </div>
    );
}

export default HorizonsData;
