import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Style/Table.css';

export default function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortedField, setSortedField] = useState('accountid');

    useEffect(() => {
        searchData()
    })

    const searchData = () => {
        const sql = `select * from account where username like '${search}%' or email like '${search}%' ORDER BY ${sortedField}`; // Use search state to construct the SQL query
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
      }, [sortedField, search]);

    return (
        <main>
            <div className='title2'>
                <h1>Accounts</h1>
            </div>

            <div className="search-container">
                <form>
                    <input className='search-form' type="search" id="gsearch" name="gsearch" value={search} onChange={handleSearchChange} placeholder="Search account by username or email" />
                </form>
            </div>

            <div className='buttonflex'>
                <Link to={`create-account`} className='button'>
                    <button className='button-30'>Create new account</button>
                </Link>
            </div>
            <table class="table table-hover row-clickable">
                <thead>
                    <tr>
                        <th onClick={() => setSortedField('accountid')}>Account ID</th>
                        <th onClick={() => setSortedField('LOWER(username)')}>Username</th>
                        <th onClick={() => setSortedField('LOWER(email)')}>Email</th>
                        <th onClick={() => setSortedField('accountregisterdate')}>Register Date</th>
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
                                <th><Link to={`account-detail/${item.accountid}`}>{item.accountregisterdate.substring(0, item.accountregisterdate.indexOf('T'))}</Link></th>
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
