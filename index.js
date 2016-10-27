#!/usr/bin/env node
var program = require('commander');
var fs = require('fs');


//NEXT: array for
//NEXT: use commander to parse params


//TEST: rdir -b start
//TEST: rdir -b start dig
//TEST: rdir -b start dig more/basic more/community
//TEST: favicon

console.log('Hello, worldly!');


var favicon_link = '';
/*
  Try read index.html to get favicon link
*/

function buildHTML(name, favicon_link){
  var html =
    [ '<!DOCTYPE HTML>',
      '<html>',
        '<head>',
          '<meta charset="utf-8">',
          '<title>'+name+'</title>',
          favicon_link,
          '<meta http-equiv="refresh" content="0;url=\'./index.html#'+name+'\'" />',
        '</head>',
        '<body>',
          '<p><a href="./index#'+name+'">Redirect</a></p>',
        '</body>',
      '</html>'
    ].join('\n');
    console.log(html);
  return html;
}

var name = 'start';
var fileName = name + '.html';

var stream = fs.createWriteStream(fileName, favicon_link);

stream.once('open', function(fd) {
  var html = buildHTML(name);
  stream.end(html);
});