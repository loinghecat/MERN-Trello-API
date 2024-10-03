/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import {CONNECT_DB, CLOSE_DB} from '~/config/mongodb'
import {env} from '~/config/environment'
import {APIs_V1} from '~/routes/v1/index'
const START_SERVER =()=>{
  const app = express()
  app.use('/v1', APIs_V1)
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${env.AUTHOR}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })
  exitHook( () => {
    console.log('Server is shutting down...')
    CLOSE_DB()
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

