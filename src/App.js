import React, { useState, useEffect } from 'react';
import './Style/GameCard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style/AllGames.css';

function App() {
  const [data, setData] = useState([]); // Initialize state for accounts data
  const [sql, setSql] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
      .then(response => {
        console.log(response.data);
        getAllGames(); // Fetch updated data
      })
      .catch(err => alert(err));
  }

  return (
    <main>
      <div className='topbox'>
        <div className='titleag'>
          <h1 >Search all games</h1>
        </div>
        <div className='querycontainer'>
          <div onSubmit={handleSubmit} className='querybox'>
            <label htmlFor="sql">Execute SQL query:</label>
            <input type="text" id="sql" name="sql" value={sql} onChange={(e) => setSql(e.target.value)} />
            <button type="submit">Submit</button>
          </div>
        </div>
      </div>
      <div className='buttonflex'>
        <Link to={"/addgame"} className='button'>
          <button className='nice_butt_on'>Add Game</button>
        </Link>
        <Link to={"/accounts"} className='button'>
          <button className='nice_dark_butt_on'>Accounts</button>
        </Link>
      </div>
      <div className='resultcontain'>
        {data.length > 0 ? (
          // Render data if available
          data.map(item => (
            <Link to={`/game-detail/${item.gameid}`}>
              <div key={item.gameid} className="GameCard">
                <img src={item.thumbnail_link} alt="missing cover image" />
                <div className='GameText'>
                  <p>Game: {item.gamename}</p>
                  {/* <p>GameID: {item.gameid}</p> */}
                  <p>Genre: {item.genre}</p>
                  <p>Version: {item.version}</p>
                  {/* <p>Desc: {item.description}</p> */}
                  {/* <p>Release Date: {item.releasedate}</p> */}
                  {/* <p>Systems: {item.systems}</p> */}
                </div>
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