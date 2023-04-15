const express = require('express')
const app = express()
const port = process.env.PORT || 3001

const db = require('./database')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.get('/', async (req, res) => {
    res.send({message: 'If you see this when visiting the landing page. Then it works! Documentation is available on Github - https://github.com/PhupaSirirat/DatabaseSystemProject'})
})

app.get('/api/get-data', async (req, res) => {
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
  
app.post('/api/execute-query', async (req, res) => {
  const { sql } = req.body;
  if (!sql) {
    return;
  }
  const result = await db.query(sql);
  res.json(result ? result : `Query ran ${sql}`);
});


  // DEPRACATED ROUTES - USABLE BUT NO LONGER MAINTAINED

  app.post('/api/post-data', async (req, res) => {
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
  
  app.post('/api/post-data-fill', async (req, res) => {
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

  app.get('/api/query', async (req, res) => {
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
