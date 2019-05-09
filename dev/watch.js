var ribot = require('ribot')

// watch (return ribot instance)
var ribotInstance = ribot.watch({
  target: 'src',
  output: '.',
  options: {
    // template: 'pug',
  },
});
