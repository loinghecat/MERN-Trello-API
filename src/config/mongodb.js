import { env } from '~/config/environment'

import { MongoClient, ServerApiVersion } from 'mongodb'

let trelloDatabaseInstance = null

//Initialize the MongoDB client to connect to MongoDB
const mongoClientInstance = new MongoClient('mongodb+srv://loinghecat:geJBrOA8LzZwTQHS@cluster0-loinghe.yyuko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-loinghe', {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true }
})

// Connect to Database
export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}
export const GET_DB = () => {
  if (!trelloDatabaseInstance) {
    throw new Error('Call connectDB first')
  }
  return trelloDatabaseInstance
}
export const CLOSE_DB = async () => {

  await mongoClientInstance.close()
 
}