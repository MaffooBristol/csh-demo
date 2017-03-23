import express from 'express';
import path from 'path';

export default class Server {
  constructor (opts) {
    this.opts = opts;
  }
  start () {
    const app = express();
    const port = this.opts.port || 8085;

    const server = app.listen(port);
    console.log(`Started on port ${port}`);

    app.use(express.static(path.resolve('src/static')));
    app.use(express.static(path.resolve('lib/client')));

    console.log(path.resolve('src/static'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve('src/static/index.html'));
    });
  }
}

