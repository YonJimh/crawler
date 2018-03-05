
const yargs = require('yargs');
const Crawler = require('./mn');

const argv = yargs
.usage('angwhere [options]')
.option('s', {
  alias:'search',
  describe:'搜索内容',
  default:'老王'
})
.version()
.alias('v','version')
.help()
.argv;

new Crawler(argv).start();