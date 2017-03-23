const chalk = require('chalk');
const log = console.log;

const section = (messages, title) => {
  if (title) {
    log(chalk.bold(title))   
  }
  sectionBorder();
  messages.forEach(sectionMessage);
  sectionBorder();
  log('');
}

const sectionBorder = () => {
  log(`${'-'.repeat(50)}`);
}

const sectionMessage = (message) => {
  log('  ' + message);
}

const message = (message) => {
  log(' > ' + message);
}

module.exports = {
  section,
  message,
};