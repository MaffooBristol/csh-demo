import express from 'express';
import path from 'path';
import passport from 'passport';
import bodyParser from 'body-parser';
import moment from 'moment';

import Auth from './auth';

let chatbots = [
  {
    name: 'MaffBot',
    slug: 'maffbot',
    created: parseInt(moment('2017-04-04T17:53:54+01:00').valueOf(), 10),
    description: 'The best chatbot ever. It doesn\'t do anything, mind.',
  },
  {
    name: 'HarryBot',
    slug: 'harrybot',
    created: parseInt(moment('2017-04-02T10:46:35+01:00').valueOf(), 10),
    description: 'Harrybot is a very simple chatscript bot that seems to get very confused.',
  },
  {
    name: 'TanBot',
    slug: 'tanbot',
    created: parseInt(moment('2017-03-28T12:12:18+01:00').valueOf(), 10),
    description: 'Currency conversion for those trans-global jetsetters.',
  },
];

export default class Server {
  constructor (opts) {
    this.opts = opts;
  }
  start () {
    const app = express();
    const port = this.opts.port || 8085;

    app.listen(port);
    console.log(`Started on port ${port}`);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(express.static(path.resolve('src/static')));
    app.use(express.static(path.resolve('lib/client')));

    app.use(passport.initialize());
    app.use(passport.session());

    (new Auth(app)).setup();

    app.get('/api/check-auth', Auth.check, (req, res) => {
      res.send({
        success: true,
        message: 'Test',
        time: res.locals.requestTime / 1000,
        decoded: res.locals.decoded,
      });
    });

    app.post('/api/bots/list', Auth.check, (req, res) => {
      res.send({
        chatbots,
        success: true,
      });
    });

    app.post('/api/bots/add', Auth.check, (req, res) => {
      // These two lines may seem superfluous, but they ensure we're only
      // getting the data we need. The reason will become more apparant when
      // we start doing real db transactions.
      const { name, slug, description, created } = req.body.data;
      const addedChatbot = { name, slug, description, created };
      chatbots.push(addedChatbot);
      res.send({
        addedChatbot,
        success: true,
      });
    });

    app.post('/api/bots/delete', Auth.check, (req, res) => {
      const { slug } = req.body.data;
      // Mutating the original is BAAAAAAD, but this is just in preparation
      // for doing it properly.
      chatbots = chatbots.filter(chatbot => chatbot.slug !== slug);
      res.send({
        slug,
        success: true,
      });
    });

    app.post('/api/bots/edit', Auth.check, (req, res) => {
      const { slug, edit } = req.body.data;
      // Mutating the original is BAAAAAAD, but this is just in preparation
      // for doing it properly.
      let editedChatbot;
      chatbots = chatbots.map((chatbot) => {
        if (chatbot.slug !== slug) return chatbot;
        editedChatbot = Object.assign({}, chatbot, edit);
        return editedChatbot;
      });
      res.send({
        slug,
        editedChatbot,
        success: true,
      });
    });

    app.get('*', (req, res) => {
      res.sendFile(path.resolve('src/static/index.html'));
    });
  }
}

