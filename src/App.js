import React, { useState, useEffect } from 'react';

function App() {
  const [accounts, setAccounts] = useState([]); // Initialize state for accounts data

  useEffect(() => {
    getAllAccounts();
  }, []);

  function getAllAccounts() {
    fetch(`http://localhost:3001/getData?table=game`)
      .then(response => {
        console.log('connected');
        return response.json();
      })
      .then(data => {
        setAccounts(data); // Update state with fetched data
        console.log(typeof (data));
        console.log(data);
      })
  }

  return (
    <div>
      {accounts.length > 0 ? (
        // Render data if available
        accounts.map(item => (
          <div key={item.gameid}>
            <p>GameID: {item.gameid}</p>
            <p>Game: {item.gamename}</p>
            <p>Desc: {item.description}</p>
            <p>Release: {item.releasedate}</p>
            <br></br>
          </div>
        ))
      ) : (
        // Render message if no data available
        <p>There is no account data</p>
      )}
    </div>
  );
}

export default App;
