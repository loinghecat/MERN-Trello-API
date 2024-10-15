import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute'
import { columnRoute } from '~/routes/v1/columnRoute'
import { cardRoute } from '~/routes/v1/cardRoute'



const Router = express.Router()
/** Check APIs V1/status */
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({message: 'API V1 are ready to use'})
})
/** Board APIs */
Router.use('/boards', boardRoute)
Router.use('/columns', columnRoute)
Router.use('/cards', cardRoute)

export const APIs_V1 = Router