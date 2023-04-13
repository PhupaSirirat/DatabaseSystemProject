var express = require('express');
var app = express();
var port = process.env.PORT || 3031; //8081
// var fs = require("fs");

const { Pool } = require('pg');

// Create a new Pool instance with your PostgreSQL database connection details
const pool = new Pool({
    user: 'postgres',
    password: 'XfaaDvXn4aYqjM8xDfy9',
    host: 'containers-us-west-3.railway.app',
    port: '6789',
    database: 'railway',
});
const query = async (sql, values) => {
    const client = await pool.connect();
    try {
        const result = await client.query(sql, values);
        return result.rows;
    } finally {
        client.release();
    }
};

app.get('/', async (req, res) => {
    res.send({message: 'You should see this ONLY when visiting home.'})
})

app.get('/listUsers', async (req, res) => {
    console.log(req.originalUrl);
    const sql = 'Select * from account';
    const result = await query(sql);
    res.end(JSON.stringify(result));
})

var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
