import fastify from 'fastify'
import { routes } from './http/routes'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { UserAlreadyExistsError } from './use-cases/errors/user-already-exists-error'
import { InvalidCredentialsError } from './use-cases/errors/invalid-credentials-error'
import { UnauthorizedError } from './use-cases/errors/unauthorized-error'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCookie)

app.register(cors, {
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

app.register(routes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: fromZodError(error).details,
    })
  }

  if (error instanceof UserAlreadyExistsError) {
    return reply.status(409).send({
      message: error.message,
    })
  }

  if (error instanceof InvalidCredentialsError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  console.log(error)

  return reply.status(500).send({ message: 'Internal server error' })
})
