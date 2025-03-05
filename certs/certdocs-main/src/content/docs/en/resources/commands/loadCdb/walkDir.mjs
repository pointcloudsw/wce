'use strict';

/*

node ./walkDir.mjs '\.mdx?$' ../../../../

for (walk filesystem for each file of type md, mdx); do
    var fn // filename
    var fp // filepath
    var rp // fp+fn relative path to file
    var fc // file contents

    insert or update table docs ( path, doc ) values ( rp, fc );d
*/

import { readdir, readFile } from 'node:fs/promises';

const re = new RegExp(process.argv[process.argv.length-2]);
const rootDir = process.argv[process.argv.length-1];
try {
  const files = await readdir(rootDir, { recursive: true });
  for (const file of files.filter( f => f.match(re))){
    const content = await readFile(rootDir + file, { encoding: 'utf-8', flag: 'r' });
    console.log(file, '\n', content);
  }
    
} catch (err) {
  console.error(err);
}