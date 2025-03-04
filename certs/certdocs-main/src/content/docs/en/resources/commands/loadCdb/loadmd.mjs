'use strict';

/*
for (walk filesystem for each file of type md, mdx); do
    var fn // filename
    var fp // filepath
    var rp // fp+fn relative path to file
    var fc // file contents

    insert or update table docs ( path, doc ) values ( rp, fc );
*/

import mysql from 'mysql2/promise';
import 'dotenv/config';



async function test() {
  const c = await mysql.createConnection({
    port: process.env.CDB_PORT || 3306,
    infileStreamFactory: process.env.CDB_IFSF_PATH || null,
    host: process.env.CDB_HOST,
    user: process.env.CDB_USER,
    namedPlaceholders: true,
    database: process.env.CDB_DB,
    password: process.env.CDB_PW,
  });
//   console.log('connected!');
//   const [rows, fields] = await c.query('show databases');
//   console.log(rows);

  try {
    const [rows, fields] = await c.query('select path, doc from docs;');
  console.log(rows);
} catch (e) {
    console.log('caught exception!', e);
  }

  console.log(await c.execute('select sleep(0.5)'));
  console.log('after first sleep');
  console.log(await c.execute('select sleep(0.5)'));
  console.log('after second sleep');
  let start = +new Date();
  console.log(
    await Promise.all([
      c.execute('select sleep(2.5)'),
      c.execute('select sleep(2.5)'),
    ])
  );
  console.log(
    'after 2+3 parallel sleep which is in fact not parallel because commands are queued per connection'
  );
  let end = +new Date();
  console.log(end - start);
  await c.end();

  const p = mysql.createPool({
    port: process.env.CDB_PORT || 3306,
    infileStreamFactory: process.env.CDB_IFSF_PATH || null,
    host: process.env.CDB_HOST,
    user: process.env.CDB_USER,
    namedPlaceholders: true,
    database: process.env.CDB_DB,
    password: process.env.CDB_PW,
  });
  console.log(await p.execute('select sleep(0.5)'));
  console.log('after first pool sleep');
  start = +new Date();
  console.log(
    await Promise.all([
      p.execute('select sleep(2.5)'),
      p.execute('select sleep(2.5)'),
    ])
  );
  console.log('after 2+3 parallel pool sleep');
  end = +new Date();
  console.log(end - start);
  await p.end();
}

test()
  .then(() => {
    console.log('done');
  })
  .catch((err) => {
    console.log('error!', err);
    throw err;
  });