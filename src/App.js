import React, { useState, useEffect } from 'react';

function App() {
  
  const [accounts, setAccountState] = useState(false);
  useEffect(() => {
    getAllAccounts();
  }, []);

  function getAllAccounts() {
      return ( <div>You should see this unless visiting /listUsers</div> );
    //fetch('https://workable-drink-production.up.railway.app/listUsers')
      //.then(response => {
        //console.log('connected');
        //return response.text();
      //})
      //.then(data => {
        //setAccountState(data);
      //})
  }

  //return (
    //<div>
      //{/* {merchants ? merchants : 'There is no merchant data available'} */}
      //{accounts ? accounts : 'There is no accounts data'}

    //</div>
  //);
}
export default App;
