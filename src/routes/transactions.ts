import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const body = createTransactionBodySchema.parse(request.body)

    const { amount, title, type } = body
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      type,
    })

    return reply.status(201).send()
  })

  app.get('/', async (_, reply) => {
    const transactions = await knex('transactions').select('*')

    return reply.send(JSON.stringify(transactions))
  })
}
