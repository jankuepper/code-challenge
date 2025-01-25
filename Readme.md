# Code-challenge

## getting it started
prerequisit: you need to install nvm if you haven't already https://github.com/nvm-sh/nvm
typescript needs to be installed (npm -g install typescript

### backend

1. `cd` into the folder `backend`
2. run the `nvm` command and follow the instructions if necessary
3. run `npm i` if it's your first time running the backend, else ignore
4. run `npm start` to start it, your backend should start under `http://localhost:3000`

If no sqlite db exists, one will be created.
Upon first creation the necessary tables will be created and filled with some test data.
If you wish to reset the db, stop the backend, delete  the `db.sqlite` file and start the backend again.

### frontend
1. `cd` into the folder `frontend`
2. run the `nvm` command and follow the instructions if necessary
3. run `npm i` if it's your first time running the frontend, else ignore
4. run `npm run dev` to start it, your frontend should start under `http://localhost:5173`

## overview
Some short and high-level overview over the project structure.

### backend
The backend is written in typescript using node. It uses `expressjs` webserver framework to handle incoming and outgoing traffic/requests. The needed storage persistency is achieved by using the `sqlite` database. The `jsonwebtoken` package is used to provide the project-required JWT based authentication functionality. There is no authorization as of this point, since it's not required.

### frontend
The frontend is written in typescript using react. It's been chosen for it's tool ecosystem, e.g. `shadcn` (component collection) that saved me a lot of time. I wouldn't choose react under normal circumstances. The frontend uses vite as build tool.

## good to know
There is no functionality to create a user or contract. Thus you need to use a generated user. To log into the frontend  you can use a username like `test1`, they go all the way up to `test25` and the password is always `password`.

To edit a contract simply click it in the table. There is no `hint` or other user-friendly info.

The `Latest`-button under `audit` in the contract table brings you to the latest audit of the contract. If the contract has never been updated there won't be an audit but the UI should inform you.

There is no `Back`-button on the contract-audit page. Simply use your browsers `Back`-button. 

If you refresh the page while logged in, you will be logged out. There is no logout functionality other than the expiring token (30 minutes) and refreshing the page.

The sign-up page is disabled due to lacking time.
