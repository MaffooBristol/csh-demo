CSH Demo
========

[![CircleCI](https://circleci.com/gh/MaffooBristol/csh-demo/tree/master.svg?style=svg)](https://circleci.com/gh/MaffooBristol/csh-demo/tree/master)

## Setup

#### Requirements

* [Node.js](nodejs.org) (I'm using v7.x but above v4.x _may_ still work)

###### Optional
* [Nodemon](https://github.com/remy/nodemon) for auto server restart in development
* [PM2](http://pm2.keymetrics.io/) or [Forever](https://github.com/foreverjs/forever) as a nohup type thing for production
* [Git flow](https://github.com/nvie/gitflow) and [generate-release](https://www.npmjs.com/package/generate-release) for version control helpers

#### Build

```bash
npm install && npm run build
```

#### Basic start server

```bash
npm start
```

#### Development

```bash
# In one tab:
npm run watch
# In another tab:
nodemon -w lib/index.js -w package.json lib/index.js -- serve
```

#### Production

```bash
pm2 start --name "CSH" --env "production" lib/index.js -- serve
```

## Roadmap

_This will need to be put into priorities, sprints, etc. Subject to change..._

* Database integration, user accounts, backend persistence
* Real interaction with chatbot backend
* Script input layer, codemirror wizzy integration
* More secure login method (OAuth > jwt)
* Actual add, edit, etc pages
* Tests (lol psyche)
* ***Plus much, much more!***

