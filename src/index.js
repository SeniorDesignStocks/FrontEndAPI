const express = require('express');
const emoji = require('node-emoji');
const chalk = require('chalk');

const config = require('./config');
const print = require('./print');

const app = express();

// clearing the terminal
require('clear')();

// adding middleware
const morgan = require('morgan');
const cors = require('cors');
app.use(morgan((tokens, req, res) => [
  emoji.get(res.statusCode < 400 ? 'gift' : 'poop') + ' ',
  tokens.url(req, res).split('/').map(tok => chalk.underline(tok)).join(chalk.green('/')),
].join(' ')));
app.use(cors());

// setting up the API routes
app.use('/', require('./routes'));

// setting up the database
require('./database');

// listening on config port or 3000
const port = config.port || 3000;
app.listen(port);

// create a local tunnel with ngrok
if (process.env.TUNNEL) {
  const ngrok = require('ngrok');
  ngrok.connect(port, (err, url) => {
    if (err) {
      return console.error(err); 
    }

    print.section([
      `${emoji.get('unicorn_face')}  Magic  => ${chalk.magenta.bold('localhost:' + port)}`,
      `${emoji.get('unicorn_face')}  Dreams => ${chalk.magenta.bold(url)}`
    ], 'Access URLs');
  });
} else {
  print.message(`${emoji.get('unicorn_face')}  Magic  => localhost:${port}`);
}