import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style/Common.css';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortedField, setSortedField] = useState('gameaccountid');

  useEffect(() => {
    searchData()
  })

  const searchData = () => {
    const sql = `select * from ingame_account where ingamename like '%${search}%' ORDER BY ${sortedField}`; // Use search state to construct the SQL query
    axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
      .then(response => {
        if (response.data['error']) {
          alert(response.data.error); return;
        }
        console.log('connected');
        setPlayers(response.data); // Update state with fetched data
      })
      .catch(err => alert(err));
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Update search state with the input value
  }
  useEffect(() => {
    searchData();
    // eslint-disable-next-line
  }, [search, sortedField]);

  return (
    <main>
      <div className='title2'>
        <h1>Players</h1>
      </div>

      <div className="search-container">
        <form>
          <input className='search-form' type="search" id="gsearch" name="gsearch" value={search} onChange={handleSearchChange} placeholder="Search player by In-game name" />
        </form>
      </div>

      <div className='buttonflex'>
        <Link to={"/players/create-player"} className='button'>
          <button className='button-30'>Create new player</button>
        </Link>
      </div>

      <table class="table table-hover row-clickable">
        <thead>
          <tr>
            <th onClick={() => setSortedField('gameaccountid')}>Game Account ID</th>
            <th onClick={() => setSortedField('accountid')}>Account ID</th>
            <th onClick={() => setSortedField('gameid')}>Game ID</th>
            <th onClick={() => setSortedField('gameserverid')}>Game Server ID</th>
            <th onClick={() => setSortedField('LOWER(ingamename)')}>In-game name</th>
            <th onClick={() => setSortedField('accountlevel DESC')}>Account Level</th>
            <th onClick={() => setSortedField('ingameregisterdate')}>In-game register date</th>
          </tr>
        </thead>
        <tbody>
          {players.length > 0 ? (
            // Render data if available
            players.map(item => (
              <tr key={item.gameaccountid}>
                <th>
                  <Link to={`/game-detail/${item.gameid}/player-detail/${item.gameaccountid}`}>
                    {item.gameaccountid}
                  </Link>
                </th>

                <th>
                  <Link to={`/game-detail/${item.gameid}/player-detail/${item.gameaccountid}`}>
                    {item.accountid}
                  </Link>
                </th>

                <th>
                  <Link to={`/game-detail/${item.gameid}/player-detail/${item.gameaccountid}`}>
                    {item.gameid}
                  </Link>
                </th>

                <th>
                  <Link to={`/game-detail/${item.gameid}/player-detail/${item.gameaccountid}`}>
                    {item.gameserverid}
                  </Link>
                </th>

                <th>
                  <Link to={`/game-detail/${item.gameid}/player-detail/${item.gameaccountid}`}>
                    {item.ingamename}
                  </Link>
                </th>

                <th>
                  <Link to={`/game-detail/${item.gameid}/player-detail/${item.gameaccountid}`}>
                    {item.accountlevel}</Link>
                </th>

                <th>
                  <Link to={`/game-detail/${item.gameid}/player-detail/${item.gameaccountid}`}>
                    {item.ingameregisterdate.substring(0, item.ingameregisterdate.indexOf('T'))}
                  </Link>
                </th>
              </tr>
            ))
          ) : (
            // Render message if no data available
            <p>Data fetching...</p>
          )}
        </tbody>
      </table>

    </main>
  )
}
