const program = require('commander');
const fs = require('fs');
const marked = require('marked');

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
  const html = marked(file, markedOptions);
  console.log(html);
});
