import yargs from 'yargs';

import Server from './server';

const argv = yargs.argv;

if (argv._[0] === 'serve') {
  const server = new Server({ port: argv.port });
  server.start();
}
