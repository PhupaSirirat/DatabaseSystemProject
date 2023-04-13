import React, { useState, useEffect } from 'react';

function App() {
  
  const FETCH_TARGET = "http://localhost";
  const FETCH_PORT = process.env.PORT || 3001;

  const [accounts, setAccountState] = useState(false);
  useEffect(() => {
    getAllAccounts();
  }, []);

  function getAllAccounts() {
    fetch(FETCH_TARGET.concat(FETCH_PORT))
      .then(response => {
        console.log('connected');
        return response.text();
      })
      .then(data => {
        setAccountState(data);
      })
  }

  return (
    <div>
      {accounts ? accounts : 'There is no accounts data'}

    </div>
  );
}
export default App;
