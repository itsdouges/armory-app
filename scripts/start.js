process.env.NODE_ENV = 'development';

const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const execSync = require('child_process').execSync;
const opn = require('opn');
const detect = require('detect-port');
const prompt = require('./utils/prompt');
const config = require('../webpack.config');

// Tools like Cloud9 rely on this
const DEFAULT_PORT = process.env.PORT || 3000;
let compiler;

// TODO: hide this behind a flag and eliminate dead code on eject.
// This shouldn't be exposed to the user.
let handleCompile;
const isSmokeTest = process.argv.some((arg) => arg.indexOf('--smoke-test') > -1);
if (isSmokeTest) {
  handleCompile = function (err, stats) {
    if (err || stats.hasErrors() || stats.hasWarnings()) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  };
}

const friendlySyntaxErrorLabel = 'Syntax error:';

function isLikelyASyntaxError (message) {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

// This is a little hacky.
// It would be easier if webpack provided a rich error object.

function formatMessage (message) {
  return message
    // Make some common errors shorter:
    .replace(
      // Babel syntax error
      'Module build failed: SyntaxError:',
      friendlySyntaxErrorLabel
    )
    .replace(
      // Webpack file not found error
      /Module not found: Error: Cannot resolve 'file' or 'directory'/,
      'Module not found:'
    )
    // Internal stacks are generally useless so we strip them
    .replace(/^\s*at\s.*:\d+:\d+[\s)]*\n/gm, '') // at ... ...:x:y
    // Webpack loader names obscure CSS filenames
    .replace('./~/css-loader!./~/postcss-loader!', '');
}

function clearConsole () {
  process.stdout.write('\x1bc');
}

function setupCompiler (port) {
  compiler = webpack(config, handleCompile);

  compiler.plugin('invalid', () => {
    clearConsole();
    console.log('Compiling...');
  });

  compiler.plugin('done', (stats) => {
    clearConsole();
    const hasErrors = stats.hasErrors();
    const hasWarnings = stats.hasWarnings();
    if (!hasErrors && !hasWarnings) {
      console.log(chalk.green('Compiled successfully!'));
      console.log();
      // eslint-disable-next-line
      console.log('The app is running at http://localhost:' + port + '/');
      console.log();
      return;
    }

    const json = stats.toJson();
    const formattedErrors = json.errors.map((message) =>
      // eslint-disable-next-line
      'Error in ' + formatMessage(message)
    );
    const formattedWarnings = json.warnings.map((message) =>
      // eslint-disable-next-line
      'Warning in ' + formatMessage(message)
    );

    if (hasErrors) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      if (formattedErrors.some(isLikelyASyntaxError)) {
        // If there are any syntax errors, show just them.
        // This prevents a confusing ESLint parsing error
        // preceding a much more useful Babel syntax error.
        // eslint-disable-next-line
        formattedErrors = formattedErrors.filter(isLikelyASyntaxError);
      }
      formattedErrors.forEach((message) => {
        console.log(message);
        console.log();
      });
      // If errors exist, ignore warnings.
      return;
    }

    if (hasWarnings) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      formattedWarnings.forEach((message) => {
        console.log(message);
        console.log();
      });

      console.log('You may use special comments to disable some warnings.');
      // eslint-disable-next-line
      console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.');
      // eslint-disable-next-line
      console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.');
    }
  });
}

function openBrowser (port) {
  if (process.platform === 'darwin') {
    try {
      // Try our best to reuse existing tab
      // on OS X Google Chrome with AppleScript
      execSync('ps cax | grep "Google Chrome"');
      execSync(
        // eslint-disable-next-line
        'osascript ' +
        path.resolve(__dirname, './utils/chrome.applescript') +
        ' http://localhost:' + port + '/'
      );
      return;
    } catch (err) {
      // Ignore errors.
    }
  }
  // Fallback to opn
  // (It will always open new tab)
  // eslint-disable-next-line
  opn('http://localhost:' + port + '/');
}

function runDevServer (port) {
  new WebpackDevServer(compiler, {
    historyApiFallback: true,
    hot: true, // Note: only CSS is currently hot reloaded
    publicPath: config.output.publicPath,
    quiet: true,
    // eslint-disable-next-line
  }).listen(port, (err) => {
    if (err) {
      return console.log(err);
    }

    clearConsole();
    console.log(chalk.cyan('Starting the development server...'));
    console.log();
    openBrowser(port);
  });
}

function run (port) {
  setupCompiler(port);
  runDevServer(port);
}

detect(DEFAULT_PORT).then((port) => {
  if (port === DEFAULT_PORT) {
    run(port);
    return;
  }

  clearConsole();
  const question =
    chalk.yellow('Something is already running at port ' + DEFAULT_PORT + '.') + // eslint-disable-line
    '\n\nWould you like to run the app at another port instead?';

  prompt(question, true).then((shouldChangePort) => {
    if (shouldChangePort) {
      run(port);
    }
  });
});
