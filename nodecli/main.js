const program = require('commander');
const fs = require('fs');
const md2html = require('./md2html');

program.option('--gfm', 'GitHub Flavored Markdown を有効にする');
program.parse(process.argv);
const filePath = program.args[0];
const options = program.opts();
const markedOptions = {
  gfm: options.gfm ?? false,
};

fs.readFile(filePath, { encoding: 'utf-8' }, (err, file) => {
  if (err != null) {
    console.error(err.message);
    return process.exit(1);
  }
  const html = md2html(file, markedOptions);
  console.log(html);
});
