import React, { useState, useEffect } from 'react';
import './Style/GameCard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style/Common.css';
import './Style/SearchBar.css';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    searchData()
  });

  const searchData = () => {
    const sql = `select * from game where gamename like '%${search}%' ORDER BY gameid`; // Use search state to construct the SQL query
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
  
  useEffect(() => {
    searchData();
    // eslint-disable-next-line
  }, [search]);
  
  
  return (
    <main>
      <div className='title2'>
        <h1>All Games</h1>
      </div>

      <div className="search-container">
        <form>
        <input className='search-form' type="search" id="gsearch" name="gsearch" value={search} onChange={handleSearchChange} placeholder="Search game by gamename" />
        </form>
      </div>

      {/* <div className='buttonflex'>
        <Link to={"/addgame"} className='button'>
          <button className='nice_butt_on'>Create new game</button>
        </Link>
      </div> */}
      <div className='buttonflex'>
        <Link to={"/addgame"} className='button'>
          <button className="button-30">Create new game</button>
        </Link>
      </div>

      <hr className='hr3'></hr>

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
          <p>No data.</p>
        )}
      </div>
    </main>
  );
}

export default App;