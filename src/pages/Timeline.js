import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { fetchHorizonsData, extractParameters } from './HorizonsData';
import 'chartjs-adapter-moment'; 

function Timeline() {
    const [horizonsData, setHorizonsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await fetchHorizonsData();
                const processedData = fetchedData.map(result => extractParameters(result));
                setHorizonsData(processedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
      const drawChart = () => {
        if (horizonsData.length > 0) {
          const processedData = horizonsData.map(entry => {
            const dateTime = entry["Date last seen"].split('_');
            const date = new Date(dateTime[0]);
            const time = Date.parse(date.toDateString() + " " + dateTime[1]);
            const hours = new Date(time).getHours();
            const minutes = new Date(time).getMinutes();
            const timeValue = hours * 60 + minutes;
            
            // Convert the date to a string format that Chart.js can handle
            const dateString = date.toISOString().split('T')[0];
      
            return { ...entry, date: dateString, time: timeValue };
          });
      
          console.log("Processed Data:", processedData);
      
          const chartData = {
            datasets: [{
              label: 'Date last seen',
              data: processedData.map(parameters => ({
                x: parameters['date'],
                y: parameters['time']
              })),
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          };
      
          console.log("ChartData:", chartData);
      
          const ctx = document.getElementById('lineChartCanvas');
          if (ctx) {
            const previousChart = Chart.getChart(ctx);
            if (previousChart) {
              previousChart.destroy();
            }
      
            new Chart(ctx, {
              type: 'line',
              data: chartData,
              options: {
                scales: {
                  x: {
                    type: 'time',
                    position: 'bottom',
                    time: {
                      unit: 'day',
                      displayFormats: {
                        day: 'MMM d, yyyy'
                      }
                    },
                    title: {
                      display: true,
                      text: 'Date Last Seen'
                    }
                  },
                  y: {
                    type: 'linear',
                    title: {
                      display: true,
                      text: 'Time Seen (HH:mm)'
                    },
                    min: 0,
                    max: 1440,
                    ticks: {
                      callback: function(value) {
                        const hours = Math.floor(value / 60);
                        const minutes = value % 60;
                        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                      }
                    }
                  }
                },
                plugins: {
                  tooltip: {
                      callbacks: {
                          label: function(context) {
                              const value = context.parsed.y;
                                    const hours = Math.floor(value / 60);
                                    const minutes = value % 60;
                                    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

                                    const date = new Date(context.parsed.x);
                                    const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                                    return `Date: ${dateString}, Time: ${formattedTime}`;
                          }
                          
                      }
                  }
              }
          }
      });
  }
}
};
            
      
      drawChart();
      }, [horizonsData]);
      
      return (
        <div>
          <h2>Timeline</h2>
          <canvas id="lineChartCanvas"></canvas>
        </div>
      );
}

export default Timeline;
