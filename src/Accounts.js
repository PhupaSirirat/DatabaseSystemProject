import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchAccounts();
    }, [])

    const fetchAccounts = () => {
        axios.get(`https://gamedb-api-service.up.railway.app/api/get-accountlist`)
            .then(response => {
                setAccounts(response.data);
            })
            .catch(error => alert(error));
    }

    const searchData = () => {
        const sql = `select * from account where username like '${search}%' or email like '${search}%'`; // Use search state to construct the SQL query
        axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
            .then(response => {
                if (response.data['error']) {
                    alert(response.data.error); return;
                }
                console.log('connected');
                setAccounts(response.data); // Update state with fetched data
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
                <h1>Accounts</h1>
            </div>
            <form onSubmit={handleSearchSubmit}>
                <label htmlFor="gsearch">Search Game:</label>
                <input type="search" id="gsearch" name="gsearch" value={search} onChange={handleSearchChange} />
                <button type="submit">Search</button> {/* Add a submit button to trigger search */}
            </form>
            <div className='buttonflex'>
                <Link to={`create-account`} className='button'>
                    <button className='nice_dark_butt_on'>Create new account</button>
                </Link>

                <Link to={`/`} className='button'>
                    <button className='nice_butt_on'>Home</button>
                </Link>
            </div>
            <div className='resultcontain'>
                {accounts.length > 0 ? (
                    // Render if server available

                    accounts.map(item => (
                        <Link to={`account-detail/${item.accountid}`}>
                            <div key={item.accountid} className="game-item">
                                <p>Username: {item.username}</p>
                                <p>Email: {item.email}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    // Render message if no data available
                    <p>Data Fetching...</p>
                )}
            </div>
        </main >
    )
}
