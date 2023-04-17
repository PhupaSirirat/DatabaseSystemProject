import React, { useState, useEffect } from 'react';
import './Style/GameCard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style/Common.css';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllGames();
  }, []);

  const getAllGames = () => {
    const sql = `select * from game`;
    axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
      .then(response => {
        if (response.data['error']) {
          alert(response.data.error); return;
        }
        console.log('connected');
        setData(response.data); // Update state with fetched data
      })
      .catch(err => alert(err));
  }

  const searchData = () => {
    const sql = `select * from game where gamename like '%${search}%'`; // Use search state to construct the SQL query
    axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
      .then(response => {
        if (response.data['error']) {
          alert(response.data.error); return;
        }
        console.log('connected');
        setData(response.data); // Update state with fetched data
      })
      .catch(err => alert(err));
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Update search state with the input value
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    searchData(); // Call searchData function to fetch data based on search query
  }

  return (
    <main>
      <div className='title2'>
        <h1 >Search all games</h1>
      </div>

      <form onSubmit={handleSearchSubmit}>
        <label htmlFor="gsearch">Search Game by name:</label>
        <input type="search" id="gsearch" name="gsearch" value={search} onChange={handleSearchChange} />
        <button type="submit">Search</button> {/* Add a submit button to trigger search */}
      </form>

      <div className='buttonflex'>
        <Link to={"/addgame"} className='button'>
          <button className='nice_butt_on'>Add Game</button>
        </Link>
        <Link to={"/"} className='button'>
          <button className='nice_butt_on'>Home</button>
        </Link>
      </div>

      <hr className='hr2'></hr>

      <div className='resultcontain'>
        {data.length > 0 ? (
          // Render data if available
          data.map(item => (
            <div key={item.gameid} className="card">
              <Link to={`/game-detail/${item.gameid}`}>
                <img src={item.thumbnail_link} alt="" />
                <div className='card-body'>
                  <h2>{item.gamename}</h2>
                  {/* <p>GameID: {item.gameid}</p> */}
                  <p>Genre: {item.genre}</p>
                  <h5>Version: {item.version}</h5>
                  {/* <p>Desc: {item.description}</p> */}
                  {/* <p>Release Date: {item.releasedate}</p> */}
                  {/* <p>Systems: {item.systems}</p> */}
                </div>
              </Link>
            </div>
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