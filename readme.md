# Chingu Voyage Pre-work Project (Tier 3): Journal App

![Tier3 Journal App](./docs/images/Tier3_Journal_App.png)

## Overview

The goal of this project is to complete the Tier 3 Solo Project for [Chingu][1]
Voyage 11.

## Run Locally

You will need to setup some mongodb database somewhere such as
[MongoDB Atlas][2], or locally running a Mongo Docker image.

### Clone Repo

```bash
git clone https://github.com/jnmorse/voyage-prework-tier3-journal-app.git
cd voyage-prework-tier3-journal-app
npm install
```

### Setup

Create an .env file in the base directory with the MongoDB URI. You will also
need to provide a cookie secret and another mongo uri for session store. You
can copy the [sample.env](./docs/sample.env) file and change the values.

```env
MONGODB_URL="mongodb://localhost/journal-app"
SESSION_URL="mongodb://localhost/journal-app"
COOKIE_SECRET="mysecret"
```

### Run The App For Development

**note**: The development build will not be server side rendered. This is
instead using webpack-dev-server to proxy requests to the backend. In order to
make sure the app is going to work as expected when deployed it is important to
run the production build.

```bash
npm run dev
```

### Run for Production

```bash
npm run build && npm start
```

[1]: https://chingu.io/ 'Chingu'
[2]: https://www.mongodb.com/cloud/atlas/ 'MongoDB Atlas'
