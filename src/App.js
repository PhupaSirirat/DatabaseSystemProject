import React, { useState, useEffect } from 'react';
import './Style/GameCard.css';
import { Link } from 'react-router-dom';
import './Style/AllGames.css'
import axios from 'axios';

function App() {
  const [data, setData] = useState([]); // Initialize state for accounts data

  useEffect(() => {
    getAllGames();
  }, []);

  const getAllGames = () => {
    const sql = `select * from game`;
    axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
      .then(response => {
        console.log('connected');
        setData(response.data); // Update state with fetched data
      })
      .catch(err => alert(err));
  }

  return (
    <main>
      <div className='title'>
        <h1>All Game Page</h1>
      </div>

      <Link to={"/addgame"}>
        <button className='nice_dark_butt_on'>Add new game</button>
      </Link>

      <Link to={"/"}>
        <button className='nice_butt_on'>Home</button>
      </Link>

      <div className="allGames">
        {data.length > 0 ? (
          // Render data if available
          data.map(item => (
            <Link to={`/game-detail/${item.gameid}`}>
              <div key={item.gameid} className="GameCard">
                <p>Game: {item.gamename}</p>
                <p>Genre: {item.genre}</p>
                <p>Version: {item.version}</p>
              </div>
            </Link>
          ))
        ) : (
          // Render message if no data available
          <p>Data fetching...</p>
        )}
      </div>
    </main>
  );
}

export default App;