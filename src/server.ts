import fastify from 'fastify'

const app = fastify()

app.get('/hello', () => {
  return 'Hello, Rircardo!'
})

app.listen({
  port: 3333,
})
