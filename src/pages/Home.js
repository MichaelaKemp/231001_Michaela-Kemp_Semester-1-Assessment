import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import landingPageImage from '../assets/Landing_Page_Image.jpg';
import milkyWayImage from '../assets/MilkyWay.jpg';
import styles from './Home.module.css';
import Footer from '../components/Footer';

const planetComparisonData = {
  labels: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
  datasets: [
    {
      label: 'Size (km)',
      data: [4879, 12104, 12742, 6779, 139820, 116460, 50724, 49244],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
    {
      label: 'Distance from Sun (million km)',
      data: [57.9, 108.2, 149.6, 227.9, 778.5, 1434, 2871, 4495],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    },
  ],
};

const exoplanetDiscoveriesData = {
  labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: 'Exoplanets Discovered',
      data: [109, 95, 107, 118, 99, 123, 150, 175],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    },
  ],
};

const starClassificationData = {
  labels: ['Main Sequence', 'Red Giants', 'White Dwarfs', 'Neutron Stars', 'Black Holes'],
  datasets: [
    {
      label: 'Star Types',
      data: [75, 15, 7, 2, 1],
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ],
    },
  ],
};

const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.hero} style={{ backgroundImage: `url(${landingPageImage})` }}>
        <div className={styles.overlay}>
          <h1>Welcome to Orbiting Eyes</h1>
          <p className={styles.homeDescription}>Orbiting Eyes is your portal to explore the mysteries of celestial bodies. Powered by NASA's Horizon API, we bring you the latest information on planets, stars, and more. Dive into our comparison tool or journey through the cosmic timeline to uncover the wonders of the universe.</p>
        </div>
      </header>
      <main>
        <section className={styles.about}>
          <h2>What Does Orbiting Eyes Do?</h2>
          <p>Orbiting Eyes provides a unique portal to explore the mysteries of celestial bodies. By leveraging NASA's Horizon API, we bring the latest information about planets, stars, and other celestial phenomena directly to you. Our platform allows you to compare different celestial bodies, track their positions, and dive deep into the cosmic timeline to uncover the wonders of the universe. Join us on this journey through space as we aim to educate and inspire curiosity about the cosmos.</p>
        </section>
        <section className={styles.chartsSection}>
          <h2>Interesting Charts</h2>
          <div className={styles.chartsContainer}>
            <div className={styles.chartContainer}>
              <h3>Planet Comparison</h3>
              <Bar data={planetComparisonData} />
            </div>
            <div className={styles.chartContainer}>
              <h3>Exoplanet Discoveries</h3>
              <Line data={exoplanetDiscoveriesData} />
            </div>
            <div className={styles.chartContainerPie}>
              <h3>Star Classification</h3>
              <Pie data={starClassificationData} />
            </div>
          </div>
        </section>
        <section className={styles.imageOfTheDaySection}>
          <div className={styles.newsAndImage}>
            <div className={styles.newsSection}>
              <h2>Recent News</h2>
              <div className={styles.newsCards}>
                <div className={styles.newsCard}>
                  <h3>NASA Discovers New Exoplanet</h3>
                  <p>NASA's latest discovery of an exoplanet in the habitable zone...</p>
                  <a href="https://science.nasa.gov/universe/exoplanets/discovery-alert-two-new-planets-found-by-ai/" className={styles.moreDetails}>More Details</a>
                </div>
                <div className={styles.newsCard}>
                  <h3>Launch of Artemis I</h3>
                  <p>Artemis I, NASA's next mission to the Moon, is scheduled to launch...</p>
                  <a href="https://www.nasa.gov/mission/artemis-i/" className={styles.moreDetails}>More Details</a>
                </div>
              </div>
            </div>
            <div className={styles.imageContainer}>
              <h2>Image of the Day</h2>
              <img src={milkyWayImage} alt="Milky Way Galaxy" className={styles.dailyImage} />
              <div className={styles.infoCard}>
                <h3>New Images from the Hubble Telescope</h3>
                <p>The Hubble Telescope has captured stunning new images of distant galaxies, providing valuable insights into the early universe.</p>
                <a href="https://science.nasa.gov/mission/hubble/hubble-news/" className={styles.moreDetails}>More Details</a>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.moreStories}>
          <h2>More Stories</h2>
          <div className={styles.storiesGrid}>
            <div className={styles.storyCard}>
              <h3>NASA Scientists see Asteroid through Robotic Eyes</h3>
              <a href="https://www.nasa.gov/missions/nasa-scientists-see-asteroid-through-the-eyes-of-a-robot/" className={styles.moreDetails}>More Details</a>
            </div>
            <div className={styles.storyCard}>
              <h3>NASA Runs First-Ever Test of New Jet Engine Tech</h3>
              <a href="https://www.nasa.gov/aeronautics/nasa-runs-first-ever-test-of-new-jet-engine-tech/" className={styles.moreDetails}>More Details</a>
            </div>
            <div className={styles.storyCard}>
              <h3>NASA Administrator Statement on ESA’s Commitment to Space Station</h3>
              <a href="https://www.nasa.gov/news-release/nasa-administrator-statement-on-esas-commitment-to-space-station/" className={styles.moreDetails}>More Details</a>
            </div>
            <div className={styles.storyCard}>
              <h3>Modern Figures: NASA’s Past and Future</h3>
              <a href="https://www.nasa.gov/from-hidden-to-modern-figures/" className={styles.moreDetails}>More Details</a>
            </div>
            <div className={styles.storyCard}>
              <h3>TIME: 15 Years Exploring Our Interface to Space</h3>
              <a href="https://www.nasa.gov/solar-system/timed-15-years-exploring-our-interface-to-space/" className={styles.moreDetails}>More Details</a>
            </div>
            <div className={styles.storyCard}>
              <h3>Cassini Beams Back First Images from New Orbit</h3>
              <a href="https://www.jpl.nasa.gov/news/cassini-beams-back-first-images-from-new-orbit" className={styles.moreDetails}>More Details</a>
            </div>
            <div className={styles.storyCard}>
              <h3>Curiosity Rover Team Examining New Drill Hiatus</h3>
              <a href="https://skyandtelescope.org/astronomy-news/curiosity-rover-in-the-drilling-business-once-again/" className={styles.moreDetails}>More Details</a>
            </div>
            <div className={styles.storyCard}>
              <h3>Interstellar trailer</h3>
              <a href="https://www.wsj.com/video/film-trailer-interstellar/DAFDB7CE-2CCB-404C-9A78-255974AE76D7" className={styles.moreDetails}>More Details</a>
            </div>
          </div>
        </section>
        <section className={styles.funFactsContainer}>
          <h2>Fun Facts about Celestial Bodies</h2>
          <ul>
            <li>The Sun contains 99.8% of the mass in the entire solar system.</li>
            <li>Neutron stars are so dense that a teaspoonful would weigh about a billion tons on Earth.</li>
            <li>The Great Red Spot on Jupiter is a storm that has been raging for at least 400 years.</li>
          </ul>
        </section>
        <section className={styles.calendarEventsContainer}>
          <h2>Calendar Events for 2024</h2>
          <ul>
            <li>April 8-16: Lyrid Meteor Shower</li>
            <li>May 15: Total Lunar Eclipse</li>
            <li>November 11: Transit of Mercury</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
