*Don't forget to pull the changes from here to avoid conflicts.*

---

# Documentation #

**Site URL** : `🚧 WIP`

**Backend API** : `gamedb-api-service.up.railway.app`


### API Endpoints ###

---

`/api/get-data?table=xxx`

Return a JSON of the queried table from the database. You can filter it further with `field` and `value`.

Example: `/api/get-data?table=game&field=gameid&value=3`

---

`/api/query?sql=xxx`

Return a JSON of the results by directly inputing SQL command into the database. Use `+` instead of spaces, `-` instead of equal signs, `.` instead of ticks, and `~` instead of &.

:warning: The route handler does not sanitize user input.

Example: `/api/query?sql=select+gamename+from+game+where+genre-.platformer.`