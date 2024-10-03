import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from '~/routes/v1/boardRoutes'

const Router = express.Router()
/** Check APIs V1/status */
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({message: 'API V1 are ready to use'})
})
/** Board APIs */
Router.use('/boards', boardRoutes) 
export const APIs_V1 = Router