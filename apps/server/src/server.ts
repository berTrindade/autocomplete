import express from 'express'
import cors from 'cors'
import { prismaClient } from './database'

const app = express()
app.use(cors())

app.get('/search', async (req, res) => {
  console.log('Hello!')

  const users = await prismaClient.user.findMany({
    where: {
      name: {
        contains: req.query.q,
        mode: 'insensitive',
      },
    },
  })

  return res.json(users)
})

app.listen(5001, () => console.log('Server is running on 5001!'))
