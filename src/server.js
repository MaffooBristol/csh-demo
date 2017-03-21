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

    app.get('/', (req, res) => {
      res.send('Elz Demo');
    });
  }
}

