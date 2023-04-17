import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Style/Table.css';

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
    useEffect(() => {
        searchData();
        // eslint-disable-next-line
      }, [search]);

    return (
        <main>
            <div className='title2'>
                <h1>Accounts</h1>
            </div>

            <div className="search-container">
                <form>
                    <input type="search" id="gsearch" name="gsearch" value={search} onChange={handleSearchChange} placeholder="Search account by username or email" />
                </form>
            </div>

            <div className='buttonflex'>
                <Link to={`create-account`} className='button'>
                    <button className='nice_butt_on'>Create new account</button>
                </Link>

                <Link to={`/`} className='button'>
                    <button className='nice_butt_on'>Home</button>
                </Link>
            </div>
            <table class="table table-hover row-clickable">
                <thead>
                    <tr>
                        <th>Account ID</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.length > 0 ? (
                        // Render if server available
                        accounts.map(item => (
                            <tr key={item.accountid}>
                                <th><Link to={`account-detail/${item.accountid}`}>{item.accountid}</Link></th>
                                <th><Link to={`account-detail/${item.accountid}`}>{item.username}</Link></th>
                                <th><Link to={`account-detail/${item.accountid}`}>{item.email}</Link></th>
                            </tr>
                        ))
                    ) : (
                        // Render message if no data available
                        <p>Data Fetching...</p>
                    )}
                </tbody>
            </table>
        </main >
    )
}
