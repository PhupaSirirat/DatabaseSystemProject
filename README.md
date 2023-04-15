*Don't forget to pull the changes from here to avoid conflicts.*

---

# Documentation #

**Site URL** : `https://gamedb.up.railway.app/`

**Backend API** : `gamedb-api-service.up.railway.app`


### API Endpoints ###

---

`GET` `/api/get-accountlist`

Return a list of accounts in JSON format. You can limit results with `count`.

Example: `/api/get-accountlist?count=3`

---

`GET` `/api/get-accountdetails?accountid=xxx`

Return details of the specified account in JSON format.

Example: `/api/get-accountdetails?accountid=3`

---

`GET` `/api/get-serverlist`

Return a list of servers in JSON format. You can filter it further with `gameid` and limit results with `count`.

Example: `/api/get-serverlist?gameid=1&count=5`

---

`GET` `/api/get-serverdetails`

Return details of the specified server in JSON format.

Example: `/api/get-serverdetails?gameserverid=3`

---

`GET` `/api/get-serverlocation`

Return details of the specified server_location in JSON format. You can filter it further with `serverlocationid` or `region` or `colocation_country`. Use `+` instead of spaces.

Example: `/api/get-serverlocation?region=Asia`

---

`GET` `/api/get-playerlist`

Return a list of players in JSON format. You can filter it further with `gameid` or `accountid`, and limit results with `count`.

Example: `/api/get-playerlist?accountid=2&count=5`

---

`GET` `/api/get-playerdetails?gameaccountid=xxx`

Return details of the specified player (ingame_account) in JSON format .

Example: `/api/get-playerdetails?gameaccountid=5`

---

`GET` `/api/get-topplayer`

Return a list of players sorted by `accountlevel` descendingly in JSON format. You can filter it further with `gameid` and limit results with `count`.

Example: `/api/get-topplayer?gameid=1&count=3`

---

`POST` `/api/add-server`

Insert a new row into `game_server` table with `gameid`, `serverlocationid`, `ipaddress`,  `hostname`, `port`, `maxplayercount`.

Example:

```
axios.post(`https://gamedb-api-service.up.railway.app/api/add-server`, {gameid: gameid, serverlocationid: serverlocationid, ipaddress: ipaddress, hostname: hostname, port: port, maxplayercount: maxplayercount})
          .then(Response => {
            console.log(response.data);
          })
          .catch(err => alert(err));
```

:warning: The route handler does not sanitize user input.

---

`POST` `/api/register-account`

Insert a new row into `account` table with `username`, `email`, `password`, and current date.

Example:

```
axios.post(`https://gamedb-api-service.up.railway.app/api/register-account`, {username: username, email: email, password: password})
          .then(Response => {
            console.log(response.data);
          })
          .catch(err => alert(err));
```

:warning: The route handler does not sanitize user input.

---

`POST` `/api/execute-query`

Directly run SQL query in the request body on the database.

Example:

```
axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => alert(err));
```

:warning: The route handler does not sanitize user input.

---

:wastebasket: `DEPRECATED` `GET` `/api/get-data?table=xxx`

Return a JSON of the queried table from the database. You can filter it further with `field` and `value`.

Example: `/api/get-data?table=game&field=gameid&value=3`

---

:wastebasket: `DEPRECATED` `POST` `/api/post-data?table=xxx&columns=xxx&values=xxx`

Insert a row into the specified table with the specified `values` in the respective `columns`. Use `~` to separate column names and values. (`~` decodes to `, `) Use `+` instead of spaces and `.` instead of ticks.

Example: `/api/post-data?table=game_server&columns=gameserverid~hostname~port&values=1~.us001.~5003`

---

:wastebasket: `DEPRECATED` `POST` `/api/post-data-fill?table=xxx&values=xxx`

Insert a row into the specified table and fill all columns with the respective `values`. You do not need to specify the column names. However, make sure the order of the values is in the same order as the columns in the table. Use `~` to separate values. (`~` decodes to `, `) Use `+` instead of spaces and `.` instead of ticks.

:construction: The current implementation is very limiting in terms of characters it accepts. A beter one should be implemented in the future.

Example: `/api/post-data-fill?table=game&values=69~.League+of+Legoland.~.Insanity+simulator.~.1999-01-08.~.PC.~.1.~.MOBA.~.M.~.LINK.`

---

:wastebasket: `DEPRECATED` `GET` `/api/query?sql=xxx`

Return a JSON of the results by directly inputing SQL command into the database. Use `+` instead of spaces, `-` instead of equal signs, and `.` instead of ticks.

:warning: The route handler does not sanitize user input.

Example: `/api/query?sql=select+gamename+from+game+where+genre-.platformer.`