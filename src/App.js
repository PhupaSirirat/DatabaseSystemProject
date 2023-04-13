import React, { useState, useEffect } from 'react';

function App() {
  
  const [accounts, setAccountState] = useState(false);
  useEffect(() => {
    getAllAccounts();
  }, []);

  function getAllAccounts() {
    const PORT = process.env.PORT || 3001;
    fetch(`http://localhost:${PORT}`)
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
