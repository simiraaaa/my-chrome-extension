var ribot = require('ribot');
var lessBuilder = require('less-css-builder');

// watch (return ribot instance)
var ribotInstance = ribot.watch({
  target: 'src',
  output: '.',
  options: {
    // template: 'pug',
  },
});

lessBuilder.watch({
  entry: 'less/main.less',
  target: 'less',
  output: '.',
});