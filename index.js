#!/usr/bin/env node
var program = require('commander');
var fs = require('fs');


//NEXT: array for
//NEXT: use commander to parse params


//TEST: rdir -b start
//TEST: rdir -b start dig
//TEST: rdir -b start dig more/basic more/community

console.log('Hello, worldly!');

function buildHTML(name){
  var html =
    [ '<!DOCTYPE HTML>',
      '<html>',
        '<head>',
          '<meta charset="utf-8">',
          '<title>'+name+'</title>',
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

var stream = fs.createWriteStream(fileName);

stream.once('open', function(fd) {
  var html = buildHTML(name);
  stream.end(html);
});