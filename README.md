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

Since this is a monorepo, we need to keep frontend and backend separate for the webservice to start correctly.

Keep backend within  `/server/node-postgres` and frontend within `/src`
