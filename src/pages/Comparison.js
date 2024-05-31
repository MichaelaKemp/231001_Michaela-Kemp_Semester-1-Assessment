import React, { useEffect, useState } from 'react';
import { Bar, Pie, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement, RadialLinearScale, PointElement, LineElement } from 'chart.js';
import { fetchHorizonsData, extractParameters } from './HorizonsData'; // Adjust the path as necessary

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement
);

const ComparisonPage = () => {
  const [data, setData] = useState([]);
  const [firstObject, setFirstObject] = useState(null);
  const [secondObject, setSecondObject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchHorizonsData();
        const extractedData = fetchedData.map(result => extractParameters(result));
        setData(extractedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleFirstObjectChange = (event) => {
    const selectedObject = data.find(obj => obj.Name === event.target.value);
    setFirstObject(selectedObject);
  };

  const handleSecondObjectChange = (event) => {
    const selectedObject = data.find(obj => obj.Name === event.target.value);
    setSecondObject(selectedObject);
  };

  const generateBarChartData = (property) => {
    if (!firstObject || !secondObject) return { labels: [], datasets: [] };

    return {
      labels: [firstObject.Name, secondObject.Name],
      datasets: [
        {
          label: property,
          data: [parseFloat(firstObject[property]), parseFloat(secondObject[property])],
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
          borderWidth: 1
        }
      ]
    };
  };

  const generatePieChartData = (property) => {
    if (!firstObject || !secondObject) return { labels: [], datasets: [] };

    return {
      labels: [firstObject.Name, secondObject.Name],
      datasets: [
        {
          label: property,
          data: [parseFloat(firstObject[property]), parseFloat(secondObject[property])],
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
          borderWidth: 1
        }
      ]
    };
  };

  const generateRadarChartData = (property) => {
    if (!firstObject || !secondObject) return { labels: [], datasets: [] };

    return {
      labels: [firstObject.Name, secondObject.Name],
      datasets: [
        {
          label: firstObject.Name,
          data: [parseFloat(firstObject[property])],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: secondObject.Name,
          data: [parseFloat(secondObject[property])],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }
      ]
    };
  };

  return (
    <div>
      <h1>Comparison Page</h1>
      {data.length > 0 ? (
        <div>
          <div>
            <label>Select First Object: </label>
            <select onChange={handleFirstObjectChange}>
              <option value="">Select</option>
              {data.map(obj => (
                <option key={obj.Name} value={obj.Name}>{obj.Name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Select Second Object: </label>
            <select onChange={handleSecondObjectChange}>
              <option value="">Select</option>
              {data.map(obj => (
                <option key={obj.Name} value={obj.Name}>{obj.Name}</option>
              ))}
            </select>
          </div>
          {firstObject && secondObject && (
            <div>
              <h2>Orbital Period</h2>
              <Bar data={generateBarChartData('Orbital Period')} options={{ responsive: true }} />
              <h2>Inclination</h2>
              <Pie data={generatePieChartData('Inclination')} options={{ responsive: true }} />
              <h2>Eccentricity</h2>
              <Radar data={generateRadarChartData('Eccentricity')} options={{ responsive: true }} />
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ComparisonPage;
