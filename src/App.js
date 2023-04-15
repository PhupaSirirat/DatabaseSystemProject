import React, { useState, useEffect } from 'react';
import './Style/GameCard.css';
import { Link } from 'react-router-dom';
import './Style/GameCard.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]); // Initialize state for accounts data
  const [sql, setSql] = useState('');

  useEffect(() => {
    getAllGames();
  }, []);

  const getAllGames = () => {
    axios.get(`https://gamedb-api-service.up.railway.app/api/query?sql=select+*+from+game`)
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
      <h1>All Game Page</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="sql">Execute SQL query:</label>
        <input type="text" id="sql" name="sql" value={sql} onChange={(e) => setSql(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      <Link to={"/addgame"}>
        <button className='nice_butt_on'>Add Game</button>
      </Link>

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
