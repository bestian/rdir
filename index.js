#!/usr/bin/env node
var program = require('commander');
var fs = require('fs');
var path  = require('path');

//TEST: rdir -b start,dig,more/basic,more/community
//TEST: favicon



function list(val) {
  return val.split(',');
}

program
  .version('0.0.1')
  .option('-b, --list <items>', 'A list', list)
  .parse(process.argv);


console.log(' your dirs:');
console.log(' list: %j', program.list);


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
    // console.log(html);
  return html;
}


var dirs = program.list;


var mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
  }
}

function mkdirpSync (dirpath) {
  var parts = dirpath.split(path.sep);
 // console.log(parts);
  for( var i = 1; i <= parts.length; i++ ) {
    mkdirSync( path.join.apply(null, parts.slice(0, i)) );
  }
}

dirs.forEach(function(name){
  var fileName = name + '.html';
  var folderName = name.replace(/\/[a-zA-Z\-_\d]*$/,'');

//  console.log(folderName);

  mkdirpSync(folderName);

  var stream = fs.createWriteStream(fileName, favicon_link);

  stream.once('open', function(fd) {
    var html = buildHTML(name);
    stream.end(html);
  });
})
