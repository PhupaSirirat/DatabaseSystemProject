import React, { useState } from 'react';
import './Style/GameCard.css';
import { Link } from 'react-router-dom';
import './Style/Common.css'
import axios from 'axios';

function App() {
  const [result, setResult] = useState([]);
  const [sql, setSql] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
      .then(response => {
        if (response.data['error']) {
          alert(response.data.error); return;
        }
        setResult(response.data)
        alert('Query ran!');
      })
      .catch(err => alert(err));
  }

  return (
    <main>
      <div className='title'>
        <h1>Admin Tools</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sql">Execute SQL query:</label>
        <input type="text" id="sql" name="sql" value={sql} onChange={(e) => setSql(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      <Link to={"/"}>
        <button className='nice_butt_on'>Home</button>
      </Link>
      <div className='resultcontain'>
        <div className="allGames">
          {result.length > 0 ? (
            <ul>
              {result.map((item, index) => (
                <li key={index}>
                  <ul>
                    {Object.keys(item).map(key => (
                      <li key={key}>{key}: {item[key]}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            // Render message if no data available
            <p>No results...</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;