import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
  const transaction = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Transação de teste',
    amount: 1000,
  })

  return transaction
})

const PORT = env.PORT

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log('Server Running at http://localhost:' + PORT)
  })
