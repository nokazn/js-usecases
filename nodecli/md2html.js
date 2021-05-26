const marked = require('marked');

module.exports = (md, options) => {
  return marked(md, {
    gfm: options?.gfm,
  });
};
