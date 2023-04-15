const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3001

const db = require('./database')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());

app.get('/', async (req, res, next) => {
    res.send({message: 'If you see this when visiting the landing page. Then it works! Documentation is available on Github - https://github.com/PhupaSirirat/DatabaseSystemProject'})
})

app.get('/api/get-accountlist', async (req, res, next) => {
  const params = new URLSearchParams(req.query);
    let sql = '';
    if (!params.get('count')) {
      sql = 'SELECT * FROM account';
    }
    else if (params.get('count')) {
      sql = `SELECT * FROM account LIMIT ${params.get('count')}`;
    }
    if (!sql) {
      return;
    }
    const result = await db.query(sql);
    res.json(result);
});

app.get('/api/get-accountdetails', async (req, res, next) => {
  const params = new URLSearchParams(req.query);
    let sql = '';
    if (params.get('accountid')) {
      sql = `SELECT * FROM account WHERE accountid = ${params.get('accountid')}`;
    }
    if (!sql) {
      return;
    }
    const result = await db.query(sql);
    res.json(result);
});

app.get('/api/get-serverlist', async (req, res, next) => {
  const params = new URLSearchParams(req.query);
    let sql = '';
    if (!params.get('gameid') && !params.get('count')) {
      sql = 'SELECT * FROM game_server';
    }
    else if (params.get('gameid') && !params.get('count')) {
      sql = `SELECT * FROM game_server WHERE gameid = ${params.get('gameid')}`;
    }
    else if (params.get('gameid') && params.get('count')) {
      sql = `SELECT * FROM game_server WHERE gameid = ${params.get('gameid')} LIMIT ${params.get('count')}`;
    }
    if (!sql) {
      return;
    }
    const result = await db.query(sql);
    res.json(result);
});

app.get('/api/get-serverdetails', async (req, res, next) => {
  const params = new URLSearchParams(req.query);
    let sql = '';
    if (params.get('gameserverid')) {
      sql = `SELECT * FROM game_server WHERE gameserverid = ${params.get('gameserverid')}`;
    }
    if (!sql) {
      return;
    }
    const result = await db.query(sql);
    res.json(result);
});

app.get('/api/get-serverlocation', async (req, res, next) => {
  const params = new URLSearchParams(req.query);
    let sql = '';
    if (!params.get('serverlocationid') && !params.get('region') && !params.get('colocation_country')) {
      sql = `SELECT * FROM server_location`;
    }
    else if (params.get('serverlocationid') && !params.get('region') && !params.get('colocation_country')) {
      sql = `SELECT * FROM server_location WHERE serverlocationid = ${params.get('serverlocationid')}`;
    }
    else if (!params.get('serverlocationid') && params.get('region') && !params.get('colocation_country')) {
      sql = `SELECT * FROM server_location WHERE region = '${params.get('region').replace(/\+/g, " ")}'`;
    }
    else if (!params.get('serverlocationid') && !params.get('region') && params.get('colocation_country')) {
      sql = `SELECT * FROM server_location WHERE colocation_country = '${params.get('colocation_country').replace(/\+/g, " ")}'`;
    }
    if (!sql) {
      return;
    }
    const result = await db.query(sql);
    res.json(result);
});

app.get('/api/get-serverlocationfromgameserverid', async (req, res, next) => {
  const params = new URLSearchParams(req.query);
    let sql = '';
    if (params.get('gameserverid')) {
      sql = `SELECT serverlocationid FROM game_server WHERE gameserverid = ${params.get('gameserverid')}`;
    }
    if (!sql) {
      return;
    }
    const result = await db.query(sql);
    sql = `SELECT * FROM server_location WHERE serverlocationid = ${result}`
    const finalResult = await db.query(sql);
    res.json(finalResult);
});

app.get('/api/get-playerdetails', async (req, res, next) => {
  const params = new URLSearchParams(req.query);
    let sql = '';
    if (params.get('gameaccountid')) {
      sql = `SELECT * FROM ingame_account WHERE gameaccountid = ${params.get('gameaccountid')}`;
    }
    if (!sql) {
      return;
    }
    const result = await db.query(sql);
    res.json(result);
});

app.get('/api/get-playerlist', async (req, res, next) => {
  const params = new URLSearchParams(req.query);
    let sql = '';
    if (!params.get('gameid') && !params.get('accountid') && !params.get('count')) {
      sql = 'SELECT * FROM ingame_account';
    }
    else if (params.get('gameid') && !params.get('accountid') && !params.get('count')) {
      sql = `SELECT * FROM ingame_account WHERE gameid = ${params.get('gameid')}`;
    }
    else if (params.get('gameid') && !params.get('accountid') && params.get('count')) {
      sql = `SELECT * FROM ingame_account WHERE gameid = ${params.get('gameid')} LIMIT ${params.get('count')}`;
    }
    else if (!params.get('gameid') && params.get('accountid') && !params.get('count')) {
      sql = `SELECT * FROM ingame_account WHERE accountid = ${params.get('accountid')}`;
    }
    else if (!params.get('gameid') && params.get('accountid') && params.get('count')) {
      sql = `SELECT * FROM ingame_account WHERE accountid = ${params.get('accountid')} LIMIT ${params.get('count')}`;
    }
    if (!sql) {
      return;
    }
    const result = await db.query(sql);
    res.json(result);
});

app.get('/api/get-topplayer', async (req, res, next) => {
  const params = new URLSearchParams(req.query);
    let sql = '';
    if (!params.get('gameid') && !params.get('count')) {
      sql = 'SELECT * FROM ingame_account ORDER BY accountlevel DESC';
    }
    else if (params.get('gameid') && !params.get('count')) {
      sql = `SELECT * FROM ingame_account WHERE gameid = ${params.get('gameid')} ORDER BY accountlevel DESC`;
    }
    else if (params.get('gameid') && params.get('count')) {
      sql = `SELECT * FROM ingame_account WHERE gameid = ${params.get('gameid')} ORDER BY accountlevel DESC LIMIT ${params.get('count')}`;
    }
    if (!sql) {
      return;
    }
    const result = await db.query(sql);
    res.json(result);
});

app.post('/api/add-server', async (req, res, next) => {
  try {
    const { gameid, serverlocationid, ipaddress, hostname, port, maxplayercount} = req.body;
    if (!gameid || !serverlocationid || !ipaddress || !hostname || !port || !maxplayercount) {
      return res.status(400).json({ error: 'All fields not provided' });
    }
    const sql = `INSERT INTO game_server (gameid, serverlocationid, ipaddress, hostname, port, maxplayercount) VALUES (${gameid}, ${serverlocationid}, '${ipaddress}', '${hostname}', '${port}', ${maxplayercount})`
    const result = await db.query(sql);
    res.json(result);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: 'Internal server error. (Is your query correct?)' });
  }
});

app.post('/api/register-account', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields not provided' });
    }
    const sql = `INSERT INTO account (username, email, password, accountregisterdate) VALUES ('${username}', '${email}', '${password}', 'NOW()')`
    const result = await db.query(sql);
    res.json(result);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: 'Internal server error. (Is your query correct?)' });
  }
});

  app.post('/api/execute-query', async (req, res, next) => {
    try {
      const { sql } = req.body;
      if (!sql) {
        return res.status(400).json({ error: 'SQL query not provided' });
      }
      const result = await db.query(sql);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error. (Is your query correct?)' });
    }
  });
  


  // DEPRACATED ROUTES - USABLE BUT NO LONGER MAINTAINED

  app.get('/api/get-data', async (req, res, next) => {
    const params = new URLSearchParams(req.query);
    let sql = '';
    if (params.get('table') && !params.get('field') && !params.get('value')) {
      sql = 'SELECT * FROM ' + params.get('table');
    }
    else if (params.get('table') && params.get('field') && params.get('value')) {
      sql = `SELECT * FROM ${params.get('table')} WHERE ${params.get('field')} = '${params.get('value')}'`;
    }
    if (!sql) {
      return;
    }
    const result = await db.query(sql);
    res.json(result);
  });

  app.post('/api/post-data', async (req, res, next) => {
    const params = new URLSearchParams(req.query);
    let sql = '';
    if (params.get('table') && params.get('columns') && params.get('values')) {
      let new_cols = params.get('columns').replace(/\~/g, ', ')
      new_cols = new_cols.replace(/\./g, "'")
      new_cols = new_cols.replace(/\+/g, " ")
      let new_values = params.get('values').replace(/\~/g, ', ')
      new_values = new_values.replace(/\./g, "'")
      new_values = new_values.replace(/\+/g, " ")
      sql = `INSERT INTO ${params.get('table')} (${new_cols}) VALUES (${new_values})`
    }
    if (!sql) {
      return;
    }
    const result = await db.query(sql);;
    res.json(result);
  });
  
  app.post('/api/post-data-fill', async (req, res, next) => {
    const params = new URLSearchParams(req.query);
    let sql = '';
    if (params.get('table') && params.get('values')) {
      let new_values = params.get('values').replace(/\~/g, ', ')
      new_values = new_values.replace(/\./g, "'")
      new_values = new_values.replace(/\+/g, " ")
      sql = `INSERT INTO ${params.get('table')} VALUES (${new_values})`
    }
    if (!sql) {
      return;
    }
    const result = await db.query(sql);;
    res.json(result);
  });

  app.get('/api/query', async (req, res, next) => {
    const params = new URLSearchParams(req.query);
    let sql = '';
    if (params.get('sql')) {
      sql = params.get('sql').replace(/\+/g, ' ');
      sql = sql.replace(/\-/g, '=');
      sql = sql.replace(/\./g, "'");
    }
    if (!sql) {
      return;
    }
    const result = await db.query(sql);
    res.json(result);
  });

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
