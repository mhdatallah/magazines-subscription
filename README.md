# magazines-subscription

Pre-requisites:
1. Node.js
2. MySQL
3. React

The following are instructions on how to run the project.

## Backend

1. From the root of the project: `cd ./backend`
2. Create `.env` file with the follwoing data:
```
PORT=3001
MYSQL_HOST=127.0.0.1
MYSQL_USER=YOUR_MYSQL_USER
MYSQL_PASSWORD=YOUR_MYSQL_PASSWORD
MYSQL_DATABASE=magazines_subscription

```
3. `npm i`
4. `npm run db_init`
5. Wait for a few seconds then `Ctrl+C`
6. `npm run dev`

You will then have a local server running on `http://localhost:3001`

7. Paste the follwoing cURL into your terminal to create a user:
```
curl  -X POST \
  'http://localhost:3001/api/v1/users' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "username": "user1",
  "email": "user1@example.com",
  "passwordHash": "password"
}
```

## Swagger UI

To preview Swagger UI (API documentation), you can visit the following route on your browser after running the backend server:

http://localhost:3001/api-docs/

## Frontend

1. From the root of the project: `cd ./frontend`
2. Create `.env.local` with the following:
```
NEXT_PUBLIC_SUBSCRIPTION_SERVICE=http://localhost:3001
```
2. `npm i`
3. `npm run dev`

Then go to your browser and visit `http://localhost:3000`
