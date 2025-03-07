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

/*
drop table docs;
CREATE TABLE DOCS (
 ID INT NOT NULL AUTO_INCREMENT
 , DOC longblob NOT NULL
 , TYPE int(11) NOT NULL DEFAULT 0
 , PATH varchar(255) DEFAULT NULL
 , UPD_DT date NOT NULL DEFAULT current_timestamp()
 , PRIMARY KEY (ID)
);
*/

import { readdir, readFile } from 'node:fs/promises';
import mysql from 'mysql2/promise';
import 'dotenv/config';
import { subtle } from 'node:crypto';

// const crypto = globalThis.crypto;
// const { subtle } = globalThis.crypto;


const rootDir = process.argv[process.argv.length-1];
const re = new RegExp(process.argv[process.argv.length-2]);
const c = await mysql.createConnection({
    port: process.env.CDB_PORT || 3306,
    infileStreamFactory: process.env.CDB_IFSF_PATH || null,
    host: process.env.CDB_HOST,
    user: process.env.CDB_USER,
    namedPlaceholders: process.env.CDB_NAMED_PLACEHOLDERS || null,
    database: process.env.CDB_DB,
    password: process.env.CDB_PW,
  });


  async function generateAesKey(length = 256) {
    const key = await subtle.generateKey({
      name: alg,
      length,
    }, true, ['encrypt', 'decrypt']);
  
    return key;
  } 

async function aesEncrypt(ptxt) {
  // const ec = new TextEncoder();
  // const key = await generateAesKey();
  // const iv = crypto.getRandomValues(new Uint8Array(16));

  const ctxt = await crypto.subtle.encrypt({
    name: alg,
    iv,
  }, key, ec.encode(ptxt));

  // console.log(key, iv);
  
  // return {
  //   key,
  //   iv,
  //   ctxt,
  // };
  return ctxt;
}

async function aesDecrypt(ciphertext) {
  // const dec = new TextDecoder();
  // console.log(`\nCiphertext: ${ciphertext}\nDecoded Ciphertext: ${dc.decode(ciphertext)}`)
  const plaintext = await crypto.subtle.decrypt({name: alg, iv: iv}, key,ciphertext);
  // console.log(`\nCiphertext: ${ciphertext}\nPlaintext: ${plaintext}\nDecoded Plaintext: ${dc.decode(plaintext)}`)
  return dc.decode(plaintext);
}

const alg = 'AES-CBC';
const ec = new TextEncoder();
const dc = new TextDecoder();
const iv = crypto.getRandomValues(new Uint8Array(16));
const key = await generateAesKey();
// console.log(`Key: ${key}\nIv: ${iv}`);

try {
  const files = await readdir(rootDir, { recursive: true });
  let data;
  let insStmt = 'INSERT INTO DOCS (PATH, DOC) VALUES (?, ?)';
  let updStmt = 'UPDATE docs set doc = ? where path = ?';
  let selStmt = 'select ?, ? from docs';
  let values = [];
  let content;
  for (const file of files.filter( f => f.match(re))){
    content = await readFile(rootDir + file);
    // console.log(`\n${content}\n${Buffer.isBuffer(content)}`);
    data = await aesEncrypt(content);
    values = [ file, data ];
    const [ result, fields ] = await c.execute(insStmt, values);
    values = [];
    data = '';
  }
} catch (err) {
    console.error(err);
}

try {
  let text;
  // const [ result, fields ] = await c.execute('select DOC, PATH from DOCS LIMIT 2');
  const [ result, fields ] = await c.execute('select DOC, PATH from DOCS');
  for ( const rec of result ){
    // console.log(rec.DOC);
    text = await aesDecrypt(rec.DOC);
    console.log(text, rec.PATH);
  }
} catch(err) {
  console.error(err);
}

c.close();