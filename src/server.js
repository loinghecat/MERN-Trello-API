/* eslint-disable no-console */
import express from 'express'
 import exitHook from 'async-exit-hook'
import {CONNECT_DB,GET_DB, CLOSE_DB} from '~/config/mongodb'
const START_SERVER =()=>{
  const app = express()

  const hostname = 'localhost'
  const port = 8000

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    console.log(`Hello Loi Nghe, I am running at http://${ hostname }:${ port }/`)
  })
  exitHook(async () => {
    console.log('Closing MongoDB connection...')
    await CLOSE_DB()
    console.log('Closed MongoDB connection')
  })
}


(async () => {
  try {
    console.log('Connecting to MongoDB...')
    await CONNECT_DB()
    console.log('Connected to MongoDB')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB'))
//   .then(() => START_SERVER())
//   .catch(error => {s
//     console.error(error)
//     process.exit(0)
//   })

