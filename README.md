CSH Demo
========

[![CircleCI](https://circleci.com/gh/MaffooBristol/csh-demo/tree/master.svg?style=svg)](https://circleci.com/gh/MaffooBristol/csh-demo/tree/master)

Make sure you have Node installed. This is using Node version 7, but it can be
adapted to allow for different versions but they are wholly unsupported and
untested as of now. The best way to install Node is generally with TJ's n module.
Google it.

Clone it and then run:

```bash
npm install && npm run build && npm start
```

If doing devvy stuff, you can run:

```bash
# In one tab:
npm run watch
# In another tab:
nodemon -w lib/ -w package.json lib/index.js -- serve
```

You can also use nohub or forever or pm2 or whatever you want to make things work in the background.
