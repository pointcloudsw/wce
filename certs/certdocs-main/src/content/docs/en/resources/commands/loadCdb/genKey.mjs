'use strict';

/*

*************************
Data Encryption Process
-------------------------
generate iv // for kek
generate kek
export and save kek in secure location

for each plaintextdoc
    
    generate dek
    generate iv
    encrypt plaintextdoc with dek
    wrap dek with kek
    insert ciphertextdoc, wrappeddek into database
next doc

kek = await subtle.generateKey({ name: process.env.CDB_KA, length:process.env.CDB_KL }, true, [ 'wrapKey', 'unwrapKey' ] );

    expkek = await subtle.exportKey( process.env.CDB_EKT, kek );
wkey = await subtle.wrapKey( process.env.CDB_EKT, key, kek, { name: process.env.CDB_KA, iv: iv } );

wkey64 = wkey_buf.toString('base64');
'i5fDNgAMkDhYr0is8aiUNbOFfp4iIOyPgBktfnZbxbjR7+5/Xud8RP1gDjOChi4SbMw/Nq56rW7GcFA6n909IZ+vP7RoAA42mIMdUEgx7hCj3nLTUNoUdtcyTT2lVost/qTgELGE31tEIvyB511PAg8vubyJZmjW/UlodlM/1Zc='

*************************

node REPL CLI
await import('dotenv/config');
const { subtle } = await import('node:crypto');
key = await subtle.generateKey({ name: process.env.CDB_KA, length:process.env.CDB_KL }, true, [ 'encrypt', 'decrypt' ] );
expkey = await subtle.exportKey( process.env.CDB_EKT, key );


const { subtle } = await import('node:crypto');
export EK="{ key_ops: [ 'encrypt', 'decrypt' ], ext: true, kty: 'oct', k: 'uwt310hdcp3HRPq7nVZKSoR29YujJ0A8OFdV_UZEdto', alg: 'A256CBC' }"
Buffer.from(process.env.EK).toString('base64');
CDB_AES_KEY=eyBrZXlfb3BzOiBbICdlbmNyeXB0JywgJ2RlY3J5cHQnIF0sIGV4dDogdHJ1ZSwga3R5OiAnb2N0JywgazogJ3V3dDMxMGhkY3AzSFJQcTduVlpLU29SMjlZdWpKMEE4T0ZkVl9VWkVkdG8nLCBhbGc6ICdBMjU2Q0JDJyB9

const sc = require('node:crypto');
key2 = await sc.subtle.generateKey( { name: 'AES-CBC', length: 256 }, true, ['encrypt','decrypt']);

expkey = await sc.subtle.exportKey('jwk', key2 );

impkey = await sc.subtle.importKey('jwk', true, ['encrypt','decrypt'], 'uwt310hdcp3HRPq7nVZKSoR29YujJ0A8OFdV_UZEdto');
buf = Buffer.from(JSON.stringify(expkey), 'base64');
buf.toString();
Buffer.from(buf,'base64').toString('base64');
*/

import { readdir, readFile } from 'node:fs/promises';
import 'dotenv/config';
import { subtle } from 'node:crypto';


// async function generateAesKey(length = 256) {
//     return key;
// } 

// const alg = 'AES-CBC';
// const klength = 256;
// const iv = crypto.getRandomValues(new Uint8Array(16));
// const key = await generateAesKey();
const key = await subtle.generateKey({
    name: process.env.KA,
    process.env.KL,
    },
    true,
    ['encrypt', 'decrypt']
);
const expkey = await subtle.exportKey(format: process.env.CDB_EKT, key: key);
// console.log(`Key: ${key}\nIv: ${iv}`);
console.log(`Exported Key:\n${expkey}`);
const impkey = await subtle.importKey(format: 'jwk', true, [ 'encrypt', 'decrypt'], process.argv[2]);
console.log(`Imported Key:\n${impkey}`);
