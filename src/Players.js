import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Players() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const fetchPlayers = () => {
    axios.get(`https://gamedb-api-service.up.railway.app/api/get-playerlist`)
      .then(response => {
        setPlayers(response.data); // Update state with fetched data
      })
      .catch(err => alert(err));
  }

  return (
    <main>
      <h1>Players</h1>
      <Link to={"/players/create-player"}>
        <button className='nice_dark_butt_on'>Create new player</button>
      </Link>
      <Link to={"/"}>
        <button className='nice_butt_on'>Home</button>
      </Link>

      <div className='resultcontain'>
        {players.length > 0 ? (
          // Render data if available
          players.map(item => (
            <Link to={`/game-detail/${item.gameid}/player-detail/${item.gameaccountid}`}>
              <div key={item.gameaccountid} className="GameCard">
                <div className='GameText'>
                  <p>Game Account ID: {item.gameaccountid}</p>
                  <p>Account ID: {item.accountid}</p>
                  <p>Game ID: {item.gameid}</p>
                  <p>Game Server ID: {item.gameserverid}</p>
                  <p>In game name: {item.ingamename}</p>
                  <p>Account Level: {item.accountlevel}</p>
                  <p>In game register date: {item.ingameregisterdate.substring(0, item.ingameregisterdate.indexOf('T'))}</p>
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
  )
}
