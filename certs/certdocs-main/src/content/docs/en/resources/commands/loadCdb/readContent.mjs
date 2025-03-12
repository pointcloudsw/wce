'use strict';

/*

node ./readContent.mjs base64iv jsonkek

*/

import { readdir, readFile } from 'node:fs/promises';
import mysql from 'mysql2/promise';
import 'dotenv/config';
import { subtle } from 'node:crypto';

const iv = Buffer.from(process.argv[process.argv.length-2], 'base64');

const kek = await subtle.importKey(process.env.CDB_EKT, JSON.parse(process.argv[process.argv.length-1]),{name: process.env.CDB_KA, iv: iv},true,['wrapKey','unwrapKey']);

// Use pool to scale access to each DB / DB-frontend
// const p = await mysql.createPool({
const c = await mysql.createConnection({
    port: process.env.CDB_PORT || 3306,
    infileStreamFactory: process.env.CDB_IFSF_PATH || null,
    host: process.env.CDB_HOST,
    user: process.env.CDB_USER,
    namedPlaceholders: process.env.CDB_NAMED_PLACEHOLDERS || null,
    database: process.env.CDB_DB,
    password: process.env.CDB_PW,
  });

  const dc = new TextDecoder();


async function aesDecrypt(ciphertext, key) {
  const plaintext = await crypto.subtle.decrypt({name: process.env.CDB_KA, iv: iv}, key,ciphertext);
  return dc.decode(plaintext);
}


try {
  let text, wkey64, key;
  const [ result, fields ] = await c.execute('select path, doc, ck from docs');
  for ( const rec of result ){
    wkey64 = Buffer.from(rec.ck, 'base64');
    key = await subtle.unwrapKey(
        process.env.CDB_EKT
        , wkey64
        , kek
        , { name: process.env.CDB_KA, iv: iv }
        , process.env.CDB_KA
        , true
        , [ 'encrypt', 'decrypt' ]
    );
    text = await aesDecrypt(rec.doc, key);
    console.log(text, rec.path);
  }
} catch(err) {
  console.error(err);
}

c.close();
