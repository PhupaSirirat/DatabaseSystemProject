*Don't forget to pull the changes from here to avoid conflicts.*

---

# Documentation #

**Site URL** : `https://gamedb.up.railway.app/`

**Backend API** : `gamedb-api-service.up.railway.app`


### API Endpoints ###

---

`POST` `/api/execute-query`

Directly run SQL code in the request body on the database.

Example:

```
axios.post(`https://gamedb-api-service.up.railway.app/api/execute-query`, { sql })
      .then(response => {
        console.log(response.data);
        getAllGames(); // Fetch updated data
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