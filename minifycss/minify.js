const postcss = require('postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const cssFile = './public/styles/style.css'
const minCssFile = 'public/styles/style.mini.css'

// all CSS
fs.readFile( cssFile, async (err, data) => {
  const output = await postcss([cssnano, autoprefixer]).process(data);
  const minifiedCss = output.css;

  fs.writeFile( minCssFile, minifiedCss, err => {
    if (err) {
      console.log(err);
    }
  })
});