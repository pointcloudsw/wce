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
import mysql, { raw } from 'mysql2/promise';
import 'dotenv/config';


const re = new RegExp(process.argv[process.argv.length-2]);
const rootDir = process.argv[process.argv.length-1];
const c = await mysql.createConnection({
    port: process.env.CDB_PORT || 3306,
    infileStreamFactory: process.env.CDB_IFSF_PATH || null,
    host: process.env.CDB_HOST,
    user: process.env.CDB_USER,
    namedPlaceholders: process.env.CDB_NAMED_PLACEHOLDERS || null,
    database: process.env.CDB_DB,
    password: process.env.CDB_PW,
    
  });

try {
  const files = await readdir(rootDir, { recursive: true });
  let content = '';
  let sqlStmt = 'INSERT INTO docs (path, doc) VALUES (?, ?)';
  let values = [];
  for (const file of files.filter( f => f.match(re))){
    // content = await readFile(rootDir + file, { encoding: 'utf-8', flag: 'r' });
    content = await readFile(rootDir + file);
    values = [ file, content ];
    console.log('\n\n', values);
    // let [ result ] = await c.query(`insert into docs (path, doc) values ('${file}', '${stringifyObject(content)}')`);
    const [ result, fields ] = await c.execute(sqlStmt, values);
    values = [];
    // content = '';
    console.log(result);
  }
    
} catch (err) {
    console.error(err);
}

c.close();