'use strict';

const fs = require('fs');
const cheerio = require('cheerio');
const { sha256 } = require('js-sha256')

const dir = 'dist'
const headersFile = 'dist/_headers'

const attributes = [];

fs.readdir(dir, function (err, files) {
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  }
  files.forEach(function (file) {
    if (file.slice(-4) === 'html'){
      const html = fs.readFileSync(`dist/${file}`);
      const $ = cheerio.load(html);
      $('script').each(function() {
        const self = $(this);
        var attribute = {
          base64: `'sha256-${Buffer.from(sha256.arrayBuffer(self.html())).toString('base64')}'`
        };
        attributes.push(attribute)
      });
    }
  });

  const hashes = `${attributes.map(e => e.base64).join(' ')};`
  fs.readFile(headersFile, 'utf8', function(err, data) {
  const searchString = 'Content-Security-Policy';
    const re = new RegExp('^.*' + searchString + '.*$', 'gm');
    if (data?.match(re)) {
      const orig = data.match(re)[0].slice(0,-1)
      const full = `${orig} ${hashes}`
      const formatted = data.replace(re, full);
  
      fs.writeFile(headersFile, formatted, 'utf8', function(err) {
        if (err) return console.log(err);
      });
    } else {
      console.log("no security policy found")
    }
  })
});
