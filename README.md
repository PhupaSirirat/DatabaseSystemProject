# CURRENT SITUATION

I have removed `server.js` since it had the same function as `index.js`
`database.js` now only holds the Pool object and `query()` function. SQL command translation is now inside `index.js`
I have also implemented a very simple query filter for testing.

`https://workable-drink-production.up.railway.app/listUsers?field=username&value=user3` should return a single account.

Don't forget to pull the changes from here to avoid conflicts.

---

Since this is a monorepo, we need to keep frontend and backend separate for the webservice to start correctly.

Keep backend within  `/server/node-postgres` and frontend within `/src`

---

When fetching from backend with React use `https://workable-drink-production.up.railway.app/` instead of `localhost:3010`

React frontend is not currently setup, but when it is, we'll be using `https://react-frontend-production-7acb.up.railway.app/` as main URL instead of the backend one.

Current domains are temporary and will be changed once we come up with a good name.
