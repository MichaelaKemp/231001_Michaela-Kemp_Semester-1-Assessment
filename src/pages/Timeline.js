import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, TimeScale, Title, Tooltip, Legend, PointElement } from 'chart.js';
import 'chartjs-adapter-date-fns';
import HorizonsData, { extractParameters, fetchHorizonsData } from './HorizonsData';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const parseCustomDate = (dateString) => {
  const [datePart, timePart] = dateString.split('_');
  const [year, month, day] = datePart.split('-');
  const months = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };
  const monthIndex = months[month];
  if (monthIndex === undefined) {
    return null;
  }
  return new Date(Date.UTC(year, monthIndex, day, ...timePart.split(':')));
};

const TimelinePage = () => {
  const [data, setData] = useState([]);
  const [selectedBodies, setSelectedBodies] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchHorizonsData();
        const processedData = fetchedData.map(result => extractParameters(result));
        setData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && selectedBodies.length > 0) {
      const filteredData = data.filter(body => selectedBodies.includes(body.Name));
      const chartDataPoints = filteredData.map(body => {
        const date = parseCustomDate(body['Date last seen']);
        return date ? { x: date, y: body.Name } : null;
      }).filter(point => point !== null);

      setChartData({
        datasets: [
          {
            label: 'Last Seen Date',
            data: chartDataPoints,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)'
          }
        ]
      });
    } else {
      setChartData(null); // Clear chart data when no bodies are selected
    }
  }, [data, selectedBodies]);

  const handleBodyChange = (event) => {
    const bodyName = event.target.value;
    if (event.target.checked) {
      setSelectedBodies([...selectedBodies, bodyName]);
    } else {
      setSelectedBodies(selectedBodies.filter(body => body !== bodyName));
    }
  };

  return (
    <div>
      <h1>Timeline Page</h1>
      <div>
        <h2>Select Celestial Bodies</h2>
        {data.map(body => (
          <div key={body.Name}>
            <input
              type="checkbox"
              id={body.Name}
              value={body.Name}
              checked={selectedBodies.includes(body.Name)}
              onChange={handleBodyChange}
            />
            <label htmlFor={body.Name}>{body.Name}</label>
          </div>
        ))}
      </div>
      {chartData ? (
        <div>
          <h2>Last Seen Dates</h2>
          <Line 
            data={chartData} 
            options={{ 
              responsive: true,
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'day'
                  },
                  title: {
                    display: true,
                    text: 'Date'
                  }
                },
                y: {
                  type: 'category',
                  labels: selectedBodies,
                  title: {
                    display: true,
                    text: 'Celestial Body'
                  }
                }
              }
            }} 
          />
        </div>
      ) : (
        <p>{data.length === 0 ? "Loading..." : "No data to display"}</p>
      )}
    </div>
  );
};

export default TimelinePage;
