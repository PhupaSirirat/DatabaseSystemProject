/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import './Style/GameCard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]); // Initialize state for accounts data

  useEffect(() => {
    getAllGames();
  }, []);

  const getAllGames = () => {
    axios.get(`http://localhost:3001/api/get-data?table=game`)
      .then(response => {
        console.log('connected');
        setData(response.data); // Update state with fetched data
      })
      .catch(err => alert(err));
  }

  return (
    <main>
      <h1>All Game Page</h1>
      <button className='nice_butt_on'>Add Game</button>
      <div className="allGames">
        {data.length > 0 ? (
          // Render data if available
          data.map(item => (
            <Link to={`/game-detail/${item.gameid}`}>
              <div key={item.gameid} className="GameCard">
                <p>Game: {item.gamename}</p>
                {/* <p>GameID: {item.gameid}</p> */}
                <p>Genre: {item.genre}</p>
                <p>Version: {item.version}</p>
                {/* <p>Desc: {item.description}</p> */}
                {/* <p>Release Date: {item.releasedate}</p> */}
                {/* <p>Systems: {item.systems}</p> */}
              </div>
            </Link>
          ))
        ) : (
          // Render message if no data available
          <p>Fetching data...</p>
        )}
      </div>
    </main>
  );
}

export default App;
