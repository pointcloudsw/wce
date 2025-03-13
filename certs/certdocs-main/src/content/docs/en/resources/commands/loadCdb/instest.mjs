'use strict';

/*

node ./instest

*/

import mysql from 'mysql2/promise';
import 'dotenv/config';
import Fastify from 'fastify';
const fastify = Fastify({ logger: true });





const sqlres = async (stmt, vals = null) => {
    let res;
    const values = [ vals ] ?? null;
    // try {
        const [ result, fields ] = await p.execute(stmt, values );
        res = JSON.stringify(result);
        // console.log(result, fields);
    // } catch(err) {
        // console.error(err);
    // } finally {
        return res;
    // }
}

    const p = await mysql.createConnection({
        port: process.env.CDB_PORT || 3306,
        infileStreamFactory: process.env.CDB_IFSF_PATH || null,
        host: process.env.CDB_HOST,
        user: process.env.CDB_USER,
        namedPlaceholders: process.env.CDB_NAMED_PLACEHOLDERS || null,
        database: process.env.CDB_DB,
        password: process.env.CDB_PW,
      });
  
  fastify.get('/', async function (request, reply) {
    // 'insert into riv ( val ) values ( ? )'
    // reply.code(200).send({ data: 'home page' })
    const d = await sqlres('select count(*) from riv');
    // console.log(d);
    reply.type('text/plain').code(200).send(d);
  });

  fastify.get('/insert', async function (request, reply) {
    // 'insert into riv ( val ) values ( ? )'
    // reply.code(200).send({ data: 'home page' })
    const d = await sqlres('insert into riv ( val ) values ( rand() )');
    // console.log(d);
    reply.type('text/plain').code(200).send(d);
  });  
  
  fastify.post('/post/:id', async function (request, reply) {
    const { id } = request.params
    reply.code(201).send({ data: `${id}` })
  })
  
  fastify.put('/put/:id', async function (request, reply) {
    const { id } = request.params
    reply.code(200).send({ data: `${id}` })
  })
  
  fastify.delete('/delete/:id', async function (request, reply) {
    const { id } = request.params
    reply.code(204).send({ data: `${id}` })
  })


    fastify.listen({
        host: '::',
        port: 3000
    }).catch( () => {
        console.log('Ended!')
    });

    // fastify.close();
    // done()
    // process.exit(1)
    // p.close();
