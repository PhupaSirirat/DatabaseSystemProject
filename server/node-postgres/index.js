const express = require('express')
const app = express()
const port = process.env.PORT || 3001

const db = require('./database')

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.get('/', async (req, res) => {
    res.send({message: 'If you see this when visiting the landing page. Then it works! OTHER END POINTS: /listUsers should return all accounts. You can filter results with ?<field>&<value>= ex: /listUsers?field=username&value=user3 returns account with username of user3'})
})

app.get('/listUsers', async (req, res) => {
    const params = new URLSearchParams(req.query);
    let sql = 'SELECT * FROM account';
    if (params.get('field') && params.get('value')) {
      sql = `SELECT * FROM account WHERE ${params.get('field')} = '${params.get('value')}'`;
    }
    const result = await db.query(sql);
    res.json(result);
  });  // !!VULNERABLE TO SQL INJECTION!!

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})